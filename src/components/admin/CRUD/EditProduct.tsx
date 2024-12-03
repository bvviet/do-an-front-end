import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { LinearProgress, MenuItem, Select, Box, TextField, FormControlLabel, Switch, Tooltip, IconButton } from "@mui/material";
import axios from "axios";
import { useBrands } from "@/hooks/useBrand";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSizes } from "@/hooks/useSize";
import { useColors } from "@/hooks/useColor";
import { useEditProductMutation } from "@/services/productApi";
import { AddProduct, ProductVariants } from "@/types/product";
import { useGetCategoriesQuery } from "@/services/authApi";
import { ICategory } from "@/types/genre";
import CFButton from "../CfButton";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
interface VariantError {
  product_size_id?: string;
  product_color_id?: string;
  quantity?: string;
  image?: string;
}
export default function EditProducts() {
  const { slug } = useParams();
  const [product, setProduct] = useState<AddProduct | null>(null);
  const [productVariants, setProductVariants] = useState<
    Array<{
      product_size_id: string;
      product_color_id: string;
      quantity: number;
      image: File | null;
    }>
  >([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AddProduct>();

  const { brandsData, brandsLoading, brandsError } = useBrands();
  const { sizes, isLoading: isLoadingSizes, error: sizeError } = useSizes();
  const { colors, isLoading: isLoadingColors, error: colorError } = useColors();
  const { openPopup } = useModalContext();
  const { data: categories = { categories: [] as ICategory[] } } =
    useGetCategoriesQuery();
  const [editProduct, { isLoading }] = useEditProductMutation();

  const [variantErrors, setVariantErrors] = useState<VariantError[]>([]);

  const validateVariants = () => {
    const errors: VariantError[] = productVariants.map((variant) => {
      const error: VariantError = {};

      // Kiểm tra từng trường hợp lỗi cho biến thể
      if (!variant.product_size_id) {
        error.product_size_id = "Kích thước không được để trống.";
      }
      if (!variant.product_color_id) {
        error.product_color_id = "Màu sắc không được để trống.";
      }
      if (!variant.quantity || variant.quantity <= 0) {
        error.quantity = "Số lượng phải lớn hơn 0.";
      }
      return error;
    });

    // Cập nhật lỗi vào state
    setVariantErrors(errors);

    // Kiểm tra xem có lỗi nào không
    return errors.every((err) => Object.keys(err).length === 0);
  };
  // Fetch product details
  useEffect(() => {
    if (!slug) return;
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${slug}`);
        setProduct(data);

        // Chuyển đổi biến thể từ API trả về
        const variants = data.productVariants.map((variant: ProductVariants) => ({
          product_size_id: variant.product_size_id.toString(),
          product_color_id: variant.product_color_id.toString(),
          quantity: variant.quantity,
          image: variant.image,
        }));

        setProductVariants(variants);

        // Reset form với dữ liệu sản phẩm
        reset({
          name: data.name,
          price_regular: data.price_regular,
          price_sale: data.price_sale,
          description: data.description,
          content: data.content,
          brand_id: data.brand_id,
          category_id: data.category_id,
          img_thumbnail: data.img_thumbnail,
        });
      } catch (error) {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi tải sản phẩm");
      }
    };
    fetchProductDetails();
  }, [slug, reset]);

  const handleAddVariant = () => {
    setProductVariants((prev) => [
      ...prev,
      { product_size_id: "", product_color_id: "", quantity: 0, image: null },
    ]);
  };
  const handleRemoveVariant = (index: number) => {
    setProductVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateVariant = (
    index: number,
    field: string,
    value: string | number | File | null
  ) => {
    setProductVariants((prev) => {
      const updatedVariants = [...prev];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: value,
      };
      return updatedVariants;
    });
  };
  const onSubmit = async (data: AddProduct) => {
    console.log("Dữ liệu trước khi gửi:", data); // Kiểm tra console để chắc chắn rằng data có đầy đủ các trường
    const formData = new FormData();

    const isValid = validateVariants();
    if (!isValid) {
      toast.error("Vui lòng kiểm tra lại thông tin các biến thể.");
      return;
    }
    // Append product details
    Object.keys(data).forEach((key) => {
      let value = data[key as keyof AddProduct];
      if (typeof value === "boolean") {
        value = value ? 1 : 0; // Chuyển đổi boolean thành 1/0
      }
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      } else {
        console.error(`Trường ${key} không có giá trị!`);
      }
    });

    // Append variants
    productVariants.forEach((variant, index) => {
      console.log("Variant at index", index, ":", variant); // Kiểm tra dữ liệu variant

      formData.append(`product_variants[${index}][product_size_id]`, variant.product_size_id.toString());
      formData.append(`product_variants[${index}][product_color_id]`, variant.product_color_id.toString());
      formData.append(`product_variants[${index}][quantity]`, variant.quantity.toString());

      if (variant.image && typeof variant.image !== "string") {
        formData.append(`product_variants[${index}][image]`, variant.image);
      }
    });
    if (data.img_thumbnail instanceof FileList && data.img_thumbnail.length > 0) {
      formData.append("img_thumbnail", data.img_thumbnail[0]); // Thêm ảnh đầu tiên từ FileList
    } else if (data.img_thumbnail instanceof File) {
      formData.append("img_thumbnail", data.img_thumbnail); // Thêm ảnh trực tiếp nếu là File
    }
    try {
      if (!slug) {
        throw new Error("Slug không tồn tại");
      }

      console.log("Gọi editProduct:", slug, formData);
      const response = await editProduct({ slug, updatedProduct: formData }).unwrap();
      console.log("Phản hồi API:", response);

      toast.success("Sản phẩm đã được sửa thành công!");
      setTimeout(() => {
        window.location.href = "/admin/product"; // Redirects to the specified URL
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi sửa sản phẩm:", error);
      toast.error("Đã xảy ra lỗi khi sửa sản phẩm.");
    }
  };

  if (brandsLoading || isLoadingSizes || isLoadingColors) {
    return <LinearProgress />;
  }

  if (brandsError || sizeError || colorError) {
    return <p>Đã xảy ra lỗi khi tải dữ liệu!</p>;
  }

  return (
    <div className="h-auto rounded-xl bg-white px-2 pb-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1 pt-12 px-6">
          {/* Left column */}

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
              required: "Giá gốc không được để trống", validate: value =>
                value > 1000 || "Giá phải lớn hơn 1000"
            })}
            error={!!errors.price_regular}
            helperText={errors.price_regular?.message}
          />
          <div className="flex flex-col">
            <label>Chọn thương hiệu</label>
            <Controller
              control={control}
              name="brand_id"
              defaultValue={product?.brand_id}
              render={({ field }) => (
                <Select  {...field} displayEmpty sx={{ width: "full" }}>
                  <MenuItem value={product?.brand_id} disabled>
                    {product?.brand_name} {/* Hiển thị tên thương hiệu hiện tại */}
                  </MenuItem>
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
              defaultValue={product?.category_id}
              render={({ field }) => (
                <Select {...field} displayEmpty sx={{ width: "full" }}>
                  <MenuItem value={product?.category_id} disabled>
                    {product?.category_name} {/* Hiển thị tên thương hiệu hiện tại */}
                  </MenuItem>
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

                          </MenuItem>
                        )
                      ))}
                </Select>
              )}
            />
          </div>

          <div className="flex items-center  justify-center gap-8">
            <input
              type="file"
              className="block w-full rounded-lg border p-2.5"
              {...register("img_thumbnail")}

            />
            <img
              src={
                typeof product?.img_thumbnail === "string"
                  ? product.img_thumbnail
                  : product?.img_thumbnail
                    ? URL.createObjectURL(product.img_thumbnail)
                    : undefined
              }
              alt=""
              className="size-[50px] rounded-md "
            />
          </div>
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
              validate: (value) => {
                const priceRegular = getValues("price_regular"); // Lấy giá gốc từ form
                if (value >= priceRegular) {
                  return "Giá sale phải nhỏ hơn giá gốc";
                }
                return value > 1000 || "Giá sale phải lớn hơn 1000";
              },
            })}
            error={!!errors.price_sale}
            helperText={errors.price_sale?.message}
          />

          {/* Right column */}
          <div>
            <label htmlFor="">Mô tả</label>
            <textarea
              rows={2}
              className="block w-full rounded-lg border p-2.5"
              placeholder="Mô tả sản phẩm"
              {...register("description", { required: "Mô tả không được để trống" })}
            />
          </div>
          <div >
            <label htmlFor="">Content</label>
            <textarea
              rows={2}
              className="block w-full rounded-lg border p-2.5"
              placeholder="Content sản phẩm"
              {...register("content", { required: "Content không được để trống" })}
            />
          </div>
          <div className="my-8 mt-2 px-7 pt-6">
            <FormControlLabel control={<Switch defaultChecked />} {...register("is_active")} label="Active" />
            {/* <FormControlLabel control={<Switch defaultChecked />} {...register("is_new")} label="New" />
            <FormControlLabel control={<Switch defaultChecked />} {...register("is_show_home")} label="Show home" /> */}
          </div>

        </div>

        {/* Product variants */}
        <div className="mt-6">
          <h2 className="text-[20px] font-semibold my-12 text-center">Biến thể sản phẩm</h2>

          {/* Container with fixed height and scrollable content */}
          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 bg-gray-200 z-10">
                <tr>
                  <th className="px-4 py-2">Size</th>
                  <th className="px-4 py-2">Màu</th>
                  <th className="px-4 py-2">Số lượng</th>
                  <th className="px-4 py-2">Ảnh</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {productVariants.map((variant, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">
                      <Select
                        value={variant.product_size_id}
                        onChange={(e) => handleUpdateVariant(index, "product_size_id", e.target.value)}
                      >
                        {sizes.map((size) => (
                          <MenuItem key={size.id} value={size.id}>
                            {size.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {variantErrors[index]?.product_size_id && (
                        <p className="text-red-500">{variantErrors[index].product_size_id}</p>
                      )}
                    </td>
                    <td className="px-4 py-2 ">
                      <Select
                        value={variant.product_color_id}
                        onChange={(e) => handleUpdateVariant(index, "product_color_id", e.target.value)}
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
                      {variantErrors[index]?.product_color_id && (
                        <p className="text-red-500">{variantErrors[index].product_color_id}</p>
                      )}
                    </td>
                    <td>
                      <input
                        className="border border-solid p-2.5 rounded-lg text-center border-gray-300"
                        type="number"
                        value={variant.quantity}
                        onChange={(e) => handleUpdateVariant(index, "quantity", +e.target.value)}
                      />
                      {variantErrors[index]?.quantity && (
                        <p className="text-red-500">{variantErrors[index].quantity}</p>
                      )}
                    </td>

                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            handleUpdateVariant(index, "image", file); // Cập nhật ảnh trong biến thể
                          }}
                        />
                        {variant.image && (
                          <img
                            src={
                              typeof variant.image === "string"
                                ? variant.image // Nếu là URL
                                : URL.createObjectURL(variant.image) // Nếu là File
                            }
                            alt={`Variant ${index} Image`}
                            className="w-16 h-16 object-cover mt-2"
                          />
                        )}
                      </div>
                    </td>
                    <Tooltip title="Delete product">
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          openPopup(
                            <CFButton
                              title="Are you sure you want to delete this item?"
                              handleDelete={() => handleRemoveVariant(index)}
                            />
                          )
                        }
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        <div className="flex justify-end gap-6 px-7 mt-12 items-center">
          <button
            type="button"
            className="text-gray-800 text-[14px] max-lg:text-[12px] leading-[166.667%] font-manrope py-4 px-12 bg-[#34e693] rounded-xl flex items-center justify-center gap-2"
            onClick={handleAddVariant}
          >
            Thêm biến thể
          </button>
          <button
            type="submit"
            className="text-black text-[14px] max-lg:text-[12px] leading-[166.667%] font-manrope py-4 px-12 bg-[#FFD44D] rounded-xl flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Sửa sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}
