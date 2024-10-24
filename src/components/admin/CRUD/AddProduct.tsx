import FormField from "@/components/FormField";
import TextInputs from "@/components/FormInputs/TextInputs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddProduct } from "@/types/product";
import { Box, FormControlLabel, LinearProgress, MenuItem, Select, Switch } from "@mui/material";
import { useGetCategoriesQuery } from "@/services/authApi";
import { ICategory } from "@/types/genre";
import { useAddProductMutation } from "@/services/productApi";
import { useBrands } from "@/hooks/useBrand";
import { useSizes } from "@/hooks/useSize";
import { useColors } from "@/hooks/useColor";
import { useState } from "react";
import { useTabContext } from "@/contexts/TabContext";

export default function AddProducts() {
  const { control, register, handleSubmit, reset } = useForm<AddProduct>();
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
    <div className="h-full rounded-xl bg-white px-2 pb-12">
      <div className="flex-no-wrap flex items-start">
        <div className="w-full">
          <div className="px-2">
            <div className="py-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                  <div>
                    <div className="mt-6 px-7">
                      <div className="grid w-full grid-cols-1 gap-7">
                        <FormField
                          label="Tên sản phẩm"
                          type="text"
                          Component={TextInputs}
                          control={control}
                          {...register("name")}
                        />
                        <FormField
                          label="Giá sản phẩm"
                          type="number"
                          Component={TextInputs}
                          control={control}
                          {...register("price_regular")}
                        />
                        <FormField
                          label="Giá sản phẩm sale"
                          type="number"
                          Component={TextInputs}
                          control={control}
                          {...register("price_sale")}
                        />
                        <div className="flex flex-col">
                          <label>Chọn thương hiệu</label>
                          <Controller
                            control={control}
                            name="brand_id"
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
                        </div>
                        <div className="flex flex-col">
                          <label>Chọn danh mục</label>
                          <Controller
                            control={control}
                            name="category_id"
                            render={({ field }) => (
                              <Select {...field} displayEmpty sx={{ width: "full" }}>
                                {Array.isArray(categories.categories) &&
                                  categories.categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                      {category.name}
                                    </MenuItem>
                                  ))}
                              </Select>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="my-8 mt-2 px-7 pt-2">
                      <label htmlFor="description" className="mb-2 block text-[16px] font-semibold text-gray-900">
                        Mô tả
                      </label>
                      <textarea
                        id="description"
                        rows={2}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Vui lòng viết thêm mô tả sản phẩm"
                        {...register("description")}
                      />
                    </div>
                    <div className="my-8 mt-2 px-7 pt-2">
                      <label htmlFor="content" className="mb-2 block text-[16px] font-semibold text-gray-900">
                        Nội dung
                      </label>
                      <textarea
                        id="content"
                        rows={2}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Vui lòng viết thêm nội dung sản phẩm"
                        {...register("content")}
                      />
                    </div>
                    <div className="my-8 mt-2 px-7 pt-2">
                      <label className="mb-2 block text-[16px] font-semibold text-gray-900">
                        Chất liệu
                      </label>
                      <textarea
                        id="user_manual"
                        rows={2}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Vui lòng viết thêm nội dung sản phẩm"
                        {...register("user_manual")}
                      />
                    </div>
                    <div className="my-8 mt-2 px-7 pt-6">
                      <FormControlLabel control={<Switch defaultChecked />} {...register("is_active")} label="Active" />
                      <FormControlLabel control={<Switch defaultChecked />} {...register("is_new")} label="New" />
                      <FormControlLabel control={<Switch defaultChecked />} {...register("is_show_home")} label="Show home" />
                    </div>
                    <div className="my-8 mt-2 px-7 pt-2">
                      <label htmlFor="img_thumbnail" className="mb-2 block text-[16px] font-semibold text-gray-900">
                        Ảnh Thumbnail
                      </label>
                      <input
                        id="img_thumbnail"
                        type="file"
                        accept="image/*"
                        {...register("img_thumbnail")}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                {/* Phần thêm kích thước và màu sắc */}
                <h2 className="text-[1.5rem] my-4 mt-2 pl-8 pt-2 font-semibold">Thêm biến thể sản phẩm</h2>
                <div className=" mt-2 px-7 pt-2 grid grid-cols-5">
                  {productVariants.map((variant, index) => (
                    <div key={index} className="mb-4 border rounded-md p-4">
                      <Select
                        value={variant.product_size_id}
                        onChange={(e) => updateVariant(index, "product_size_id", e.target.value)}
                        displayEmpty
                      >
                        {sizes.map((size) => (
                          <MenuItem key={size.id} value={size.id}>
                            {size.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <Select
                        value={variant.product_color_id}
                        onChange={(e) => updateVariant(index, "product_color_id", e.target.value)}
                        displayEmpty
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
                      <TextInputs
                        type="number"
                        label="Số lượng"
                        value={String(variant.quantity)} // Chuyển đổi sang string
                        onChange={(e) => updateVariant(index, "quantity", Number(e.target.value))}
                        name={`quantity-${index}`} // Đặt tên duy nhất cho trường
                        placeholder="Nhập số lượng"

                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="max-w-[200px]"
                        onChange={(e) => {
                          if (e.target.files) {
                            updateVariant(index, "image", e.target.files[0]); // Chấp nhận File
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-6 px-7 items-center">
                  <button
                    type="button"
                    className=" mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                    onClick={() => addVariant("", "")}
                  >
                    Thêm biến thể
                  </button>
                  <button
                    type="submit"
                    className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang thêm..." : "Thêm sản phẩm"}
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
