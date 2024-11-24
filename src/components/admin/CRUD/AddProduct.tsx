import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddProduct } from "@/types/product";
import { Box, FormControlLabel, LinearProgress, MenuItem, Select, Switch, TextField } from "@mui/material";
import { useGetCategoriesQuery } from "@/services/authApi";
import { ICategory } from "@/types/genre";
import { useAddProductMutation } from "@/services/productApi";
import { useBrands } from "@/hooks/useBrand";
import { useSizes } from "@/hooks/useSize";
import { useColors } from "@/hooks/useColor";
import { useEffect, useState } from "react";
import { useTabContext } from "@/contexts/TabContext";

export default function AddProducts() {
  const { control, register, handleSubmit, reset, formState: { errors }, getValues } = useForm<AddProduct>();
  const { data: categories = { categories: [] as ICategory[] } } = useGetCategoriesQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { brandsData, brandsLoading, brandsError } = useBrands();
  const { sizes, isLoading: isLoadingSizes, error: sizeError } = useSizes();
  const { colors, isLoading: isLoadingColors, error: colorError } = useColors();
  const { setValue } = useTabContext();
  const [productVariants, setProductVariants] = useState<{
    product_size_id: string;
    product_color_id: string;
    quantity: number;
    image: File | null;
  }[]>([]);
  console.log("color", colors);
  useEffect(() => {
    if (sizes.length > 0 && colors.length > 0) {
      setProductVariants([{
        product_size_id: String(sizes[0]?.id || ""),
        product_color_id: String(colors[0]?.id || ""),
        quantity: 0,
        image: null
      }]);
    }
  }, [sizes, colors]);
  // Kiểm tra lỗi hoặc dữ liệu đang tải
  if (isLoadingSizes || isLoadingColors) {
    return <p> <LinearProgress /></p>;
  }

  if (sizeError || colorError) {
    return <p>Đã xảy ra lỗi khi tải dữ liệu!</p>;
  }

  if (brandsError) {
    toast.error("Không thể tải danh sách thương hiệu");
  }


  console.log("color", colors); // Chạy khi sizes hoặc colors thay đổi
  const onSubmit: SubmitHandler<AddProduct> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price_regular", String(data.price_regular));
    formData.append("price_sale", String(data.price_sale));
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("view", String(1));
    formData.append("user_manual", data.user_manual);
    formData.append("is_active", data.is_active ? "1" : "0");
    formData.append("is_new", data.is_new ? "1" : "0");
    formData.append("is_show_home", data.is_show_home ? "1" : "0");
    formData.append("category_id", data.category_id.toString());
    formData.append("brand_id", data.brand_id.toString());
    formData.append("img_thumbnail", data.img_thumbnail || "null");

    if (data.img_thumbnail instanceof FileList && data.img_thumbnail.length > 0) {
      formData.append("img_thumbnail", data.img_thumbnail[0]); // Thêm ảnh đầu tiên từ FileList
    } else if (data.img_thumbnail instanceof File) {
      formData.append("img_thumbnail", data.img_thumbnail); // Thêm ảnh trực tiếp nếu là File
    }
    productVariants.forEach((variant, index) => {
      // Thêm từng trường của product_variants vào FormData trực tiếp
      formData.append(`product_variants[${index}][product_size_id]`, variant.product_size_id.toString());
      formData.append(`product_variants[${index}][product_color_id]`, variant.product_color_id.toString());
      formData.append(`product_variants[${index}][quantity]`, variant.quantity.toString());

      // Nếu có hình ảnh, thêm hình ảnh vào FormData
      if (variant.image) {
        formData.append(`product_variants[${index}][image]`, variant.image);
      }
    });

    try {
      await addProduct(formData).unwrap();
      toast.success("Sản phẩm đã được thêm thành công!");
      setValue("1");
      reset();
    } catch {
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm.");
    }
  };

  // Thêm biến thể mới
  const addVariant = (sizeId: string, colorId: string) => {
    setProductVariants((prev) => [
      ...prev,
      { product_size_id: sizeId, product_color_id: colorId, quantity: 0, image: null },
    ]);
  };

  // Cập nhật thông tin biến thể
  const updateVariant = (index: number, field: string, value: string | number | File) => {
    setProductVariants((prev) => {
      const newVariants = [...prev];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return newVariants;
    });
  };




  return (
    <div className="h-full rounded-xl bg-white px-2 py-12">
      <div className="flex-no-wrap flex items-start">
        <div className="w-full">
          <div className="px-2">
            <div className="py-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1 items-center">

                  <TextField
                    label="Tên sản phẩm"
                    fullWidth
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    {...register("name", { required: "Tên không được để trống" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                  <TextField
                    label="Giá gốc"
                    type="number"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    fullWidth
                    {...register("price_regular", {
                      required: "Giá gốc không được để trống",
                      validate: value => value > 0 || "Giá gốc phải lớn hơn 0"
                    })}
                    error={!!errors.price_regular}
                    helperText={errors.price_regular?.message}
                  />

                  <TextField
                    label="Giá sale"
                    type="number"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    fullWidth
                    {...register("price_sale", {
                      required: "Giá sale không được để trống",
                      validate: value => {
                        const priceRegular = getValues("price_regular"); // Lấy giá gốc từ form
                        if (value >= priceRegular) {
                          return "Giá sale phải nhỏ hơn giá gốc";
                        }
                        return value > 0 || "Giá sale phải lớn hơn 0";
                      }
                    })}
                    error={!!errors.price_sale}
                    helperText={errors.price_sale?.message}
                  />
                  <div className="my-8 mt-2 px-7 pt-6">
                    <FormControlLabel control={<Switch defaultChecked />} {...register("is_active")} label="Active" />
                    <FormControlLabel control={<Switch defaultChecked />} {...register("is_new")} label="New" />
                    <FormControlLabel control={<Switch defaultChecked />} {...register("is_show_home")} label="Show home" />
                  </div>
                  <div className="flex flex-col">
                    <label>Chọn thương hiệu</label>
                    <Controller
                      control={control}
                      {...register("brand_id", { required: "Thương hiệu không được để trống" })}
                      render={({ field }) => (
                        <Select {...field} displayEmpty sx={{ width: "full" }}>
                          {brandsLoading ? (
                            <MenuItem disabled>
                              <em>Đang tải...</em>
                            </MenuItem>
                          ) : (
                            brandsData.map((brand) => (
                              <MenuItem key={brand.id} value={brand.id}>
                                {brand.name}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      )}
                    />
                    {errors.brand_id && (
                      <p className="text-red-500 text-[1.2321rem] mt-1">{errors.brand_id.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label>Chọn danh mục</label>
                    <Controller
                      control={control}
                      {...register("category_id", { required: "Thể loại không được để trống" })}
                      render={({ field }) => (
                        <Select {...field} displayEmpty sx={{ width: "full" }}>
                          {Array.isArray(categories.categories) &&
                            categories.categories
                              .map((category) => (
                                category.children && category.children.length > 0 ? (
                                  category.children.map((child) => (
                                    <MenuItem key={child.id} value={child.id}>
                                      {child.name}
                                    </MenuItem>
                                  ))
                                ) : (
                                  <MenuItem key={category.id} value={category.id} disabled>
                                    No children available
                                  </MenuItem>
                                )
                              ))}
                        </Select>
                      )}
                    />
                    {errors.category_id && (
                      <p className="text-red-500 text-[1.2321rem] mt-1">{errors.category_id.message}</p>
                    )}
                  </div>

                  <div className="my-8 mt-2  pt-2">
                    <label htmlFor="description" className="mb-2 block text-[16px] font-semibold text-gray-900">
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      rows={2}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Vui lòng viết thêm mô tả sản phẩm"
                      {...register("description", {
                        required: "Mô tả không được để trống",
                        validate: (value) => {
                          const wordCount = value.trim().split(/\s+/).length;
                          return wordCount > 10 || "Mô tả phải dài hơn 10 từ";
                        }
                      })}
                    />
                    {errors.description && (
                      <p className="text-red-600 text-[1.2321rem] mt-1">{errors.description.message}</p>
                    )}
                  </div>
                  <div className="my-8 mt-2 pt-2">
                    <label htmlFor="content" className="mb-2 block text-[16px] font-semibold text-gray-900">
                      Nội dung
                    </label>
                    <textarea
                      id="content"
                      rows={2}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Vui lòng viết thêm nội dung sản phẩm"
                      {...register("content", {
                        required: "Content không được để trống",
                        validate: (value) => {
                          const wordCount = value.trim().split(/\s+/).length;
                          return wordCount > 10 || "Content phải dài hơn 10 từ";
                        }
                      })}
                    />
                    {errors.content && (
                      <p className="text-red-600 text-[1.2321rem] mt-1">{errors.content.message}</p>
                    )}
                  </div>
                  <div className="my-8 mt-2  pt-2">
                    <label className="mb-2 block text-[16px] font-semibold text-gray-900">
                      Chất liệu
                    </label>
                    <textarea
                      id="user_manual"
                      rows={2}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Vui lòng viết thêm nội dung sản phẩm"
                      {...register("user_manual", { required: "Chất liệu không được để trống" })}
                    />
                    {errors.user_manual && (
                      <p className="text-red-600 text-[1.2321rem] mt-1">{errors.user_manual.message}</p>
                    )}
                  </div>

                  <div className="my-8 mt-2  pt-2">
                    <label htmlFor="img_thumbnail" className="mb-2 block text-[16px] font-semibold text-gray-900">
                      Ảnh Thumbnail
                    </label>
                    <input
                      id="img_thumbnail"
                      type="file"
                      accept="image/*"
                      {...register("img_thumbnail", { required: "Ảnh không được để trống" })}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.img_thumbnail && (
                      <p className="text-red-500 text-[1.2321rem] mt-1">{errors.img_thumbnail.message}</p>
                    )}
                  </div>

                </div>
                {/* Phần thêm kích thước và màu sắc */}
                <h2 className="text-[1.5rem] my-4 mt-2 pl-8 pt-2 font-semibold">Thêm biến thể sản phẩm</h2>
                <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
                  <table className="min-w-full table-auto">
                    <thead className="sticky top-0 bg-gray-200 z-10">
                      <tr>
                        <th className="px-4 py-2">Size</th>
                        <th className="px-4 py-2">Màu</th>
                        <th className="px-4 py-2">Số lượng</th>
                        <th className="px-4 py-2">Ảnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productVariants.map((variant, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">
                            <Select
                              value={variant.product_size_id}
                              onChange={(e) => updateVariant(index, "product_size_id", e.target.value)}
                            >
                              {sizes.map((size) => (
                                <MenuItem key={size.id} value={size.id}>
                                  {size.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </td>
                          <td className="px-4 py-2 ">
                            <Select
                              value={variant.product_color_id}
                              onChange={(e) => updateVariant(index, "product_color_id", e.target.value)}
                            >
                              {colors.map((color) => (
                                <MenuItem key={color.id} value={color.id}>
                                  <Box
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      backgroundColor: color.name,
                                      borderRadius: '4px',
                                      marginRight: 1,
                                      display: 'inline-block',
                                    }}
                                  />
                                  {color.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </td>

                          <input
                            className="border border-solid p-2.5 rounded-lg text-center border-gray-300"
                            type="number"
                            value={variant.quantity}
                            onChange={(e) => updateVariant(index, "quantity", Number(e.target.value))}
                            name={`quantity-${index}`} // Đặt tên duy nhất cho trường
                            placeholder="Nhập số lượng"
                          />

                          <td className="px-4 py-2">
                            <div className="flex items-center">
                              <input
                                className="border border-solid p-2.5 rounded-lg  border-gray-300"
                                type="file"
                                onChange={(e) => {
                                  if (e.target.files) {
                                    updateVariant(index, "image", e.target.files[0]); // Chấp nhận File
                                  }
                                }}

                              />
                              {variant?.image && (
                                <img
                                  src={typeof variant?.image === "string"
                                    ? variant.image
                                    : URL.createObjectURL(variant.image)}
                                  alt="product"
                                  className="w-12 h-12 ml-2"
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end gap-6 px-7 items-center">
                  <button
                    type="button"
                    className="text-gray-800 text-[14px] max-lg:text-[12px] leading-[166.667%] font-manrope py-4 px-12 bg-[#34e693] rounded-xl flex items-center justify-center gap-2"
                    onClick={() => addVariant("", "")}
                  >
                    Thêm biến thể
                  </button>
                  <button
                    type="submit"
                    className="text-black text-[14px] max-lg:text-[12px] leading-[166.667%] font-manrope py-4 px-12 bg-[#FFD44D] rounded-xl flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Thêm sản phẩm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
