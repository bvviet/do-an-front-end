import FormField from "@/components/FormField";
import FileUploadPreview from "./FileUpload";
import TextInputs from "@/components/FormInputs/TextInputs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ProductDetailType } from "@/types/product";
import { Checkbox, FormControlLabel, MenuItem, Select } from "@mui/material";
import { useGetCategoriesQuery } from "@/services/authApi";
import { ICategory } from "@/types/genre";
import { useAddProductMutation } from "@/services/productApi";
import { useBrands } from "@/hooks/useBrand";

export default function AddProducts() {
  const { control, handleSubmit, reset } = useForm<ProductDetailType>();
  const { data: categories = { categories: [] as ICategory[] } } = useGetCategoriesQuery();
  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const { brandsData, brandsLoading, brandsError } = useBrands();
  const onSubmit: SubmitHandler<ProductDetailType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description); // Thêm mô tả
      formData.append("content", data.content); // Thêm nội dung
      formData.append("price_regular", String(data.price_regular)); // Chuyển đổi thành chuỗi
      formData.append("brand_id", data.brand_id); // Thêm brand_id
      formData.append("category_id", data.category_id); // Thêm category_id
      formData.append("is_active", "true"); // Hoặc "false" tùy vào giá trị thực tế
      formData.append("view", "0"); // Bạn có thể thay đổi theo ý muốn
      formData.append("tags", JSON.stringify(data.tags || [])); // Thêm tags nếu có
      formData.append("user_manual", ""); // Thêm user manual nếu có
      // ... Các trường khác nếu cần

      if (data.img_thumbnail && data.img_thumbnail[0]) {
        formData.append("img_thumbnail", data.img_thumbnail[0]); // Thêm thumbnail
      }

      const newProduct = await addProduct(formData).unwrap();
      console.log(newProduct);
      toast.success("Tạo sản phẩm thành công");

      // Reset form
      reset();
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      toast.error("Tạo sản phẩm thất bại");
    }
  };
  if (brandsError) {
    toast.error("Không thể tải danh sách thương hiệu");
  }
  return (
    <div className="h-[600px] rounded-xl bg-white px-2 pb-12">
      <div className="flex-no-wrap flex items-start">
        <div className="w-full">
          <div className="px-2">
            <div className="py-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                  <div>
                    <div className="mt-10 px-7">
                      <div className="grid w-full grid-cols-1 gap-7">
                        <FormField
                          label="Tên sản phẩm"
                          name="name"
                          type="text"
                          Component={TextInputs}
                          control={control}
                        />
                        <FormField
                          label="Giá sản phẩm"
                          name="price_regular"
                          type="number"
                          Component={TextInputs}
                          control={control}
                        />
                        <div className="flex flex-col">
                          <label>Chọn thương hiệu</label>
                          <Controller

                            name="brand_id"
                            control={control}
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
                            name="category"
                            control={control}
                            render={({ field }) => (
                              <Select {...field} displayEmpty sx={{ width: "full" }}>
                                {Array.isArray(categories?.categories)
                                  ? categories.categories.map((category: ICategory) => (
                                    <MenuItem key={category.id} value={category.id}>
                                      {category.name}
                                    </MenuItem>
                                  ))
                                  : null}
                              </Select>
                            )}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="is_active" className="mb-2 block text-[16px] font-semibold text-gray-900 dark:text-white">
                            Trạng thái hoạt động
                          </label>
                          <Controller
                            name="is_active"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label="Sản phẩm đang hoạt động"
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="my-8 mt-2 px-7 pt-6">
                      <label
                        htmlFor="message"
                        className="mb-2 block text-[16px] font-semibold text-gray-900 dark:text-white"
                      >
                        Mô tả
                      </label>
                      <textarea
                        id="message"
                        rows={2}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Vui lòng viết thêm mô tả sản phẩm"
                        {...control.register("description")} // Add description field
                      ></textarea>
                    </div>
                    <div className="my-8 mt-2 px-7 pt-6">
                      <label
                        htmlFor="message"
                        className="mb-2 block text-[16px] font-semibold text-gray-900 dark:text-white"
                      >
                        Content
                      </label>
                      <textarea
                        id="message"
                        rows={2}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Vui lòng viết thêm mô tả sản phẩm"
                        {...control.register("content")} // Add description field
                      ></textarea>
                    </div>
                    <FileUploadPreview />
                  </div>
                </div>

                <div className="flex w-full flex-col flex-wrap items-center justify-center gap-x-4 gap-y-4 px-7 md:justify-end lg:flex-row lg:justify-end">
                  <button
                    type="button"
                    className="w-full transform rounded border border-solid border-indigo-700 bg-white px-6 py-4 text-xl font-medium text-indigo-700 duration-300 ease-in-out hover:bg-indigo-700 hover:text-white lg:max-w-[95px]"
                    onClick={() => reset()} // Implement cancel functionality
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full transform rounded bg-indigo-700 px-6 py-4 text-xl font-medium text-white duration-300 ease-in-out hover:bg-indigo-600 lg:max-w-[144px]"
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Đang lưu..." : "Save Changes"}
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
