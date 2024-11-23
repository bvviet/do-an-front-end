import FormField from "@/components/FormField";
import TextInputs from "@/components/FormInputs/TextInputs";
import { useTabContext } from "@/contexts/TabContext";
import { useAddCategoryMutation, useGetCategoriesQuery } from "@/services/authApi";
import { ICategory } from "@/types/genre";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";

// Định nghĩa kiểu dữ liệu cho các trường của form
interface FormData {
  name: string;
  parent_id: number | "";
  image: FileList | null;
}

export default function AddCategory() {
  const { control, handleSubmit, reset, formState: { errors }, getValues } = useForm<FormData>();
  const [addCategory, { isLoading, error }] = useAddCategoryMutation();
  const { data: categories = { categories: [] as ICategory[] } } = useGetCategoriesQuery();
  const { setValue } = useTabContext(); // Lấy setValue từ TabContext

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      formData.append("parent_id", String(data.parent_id || ""));

      const newCategory = await addCategory(formData).unwrap();
      console.log(newCategory);

      toast.success("Tạo thể loại thành công");

      // Chuyển tab về "List Category" và reset form
      setValue("1");
      reset();
    } catch (err) {
      console.error("Lỗi khi thêm danh mục:", err);
      toast.error("Tạo thể loại thất bại");
    }
  };

  return (
    <div className="h-[600px] flex items-center justify-center my-auto rounded-xl  bg-white px-2 pb-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-no-wrap flex items-start">
          <div className="w-full">
            <div className="px-2">
              <div className="py-7">
                <div className="flex flex-col items-center gap-8 ">
                  <div className="w-[440px]">
                    <FormField
                      label="Tên danh mục"
                      name="name"
                      placeholder=""
                      type="text"
                      Component={TextInputs}
                      control={control}
                      rules={{
                        required: "Không được bỏ trống",
                        minLength: {
                          value: 3,
                          message: "Không được ít hơn 3 kí tự.",
                        },
                      }}
                      error={errors.name}
                    />
                    {error && (
                      <p className="text-red-500">
                        {isErrorMessage(error)}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-[440px]">
                    <label className="text-[20px] font-bold text-black">Chọn danh mục cha</label>
                    <Controller
                      name="parent_id"
                      control={control}
                      defaultValue="" // Đặt giá trị mặc định là rỗng (Không chọn)
                      render={({ field }) => (
                        <Select {...field} displayEmpty sx={{ width: "440px" }}>
                          <MenuItem value="">
                            <em>Không chọn</em>
                          </MenuItem>
                          {Array.isArray(categories?.categories)
                            ? categories.categories
                              .filter((category) => category.parent_id === 0)
                              .map((category: ICategory) => (
                                <MenuItem key={category.id} value={category.id}>
                                  {category.name}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                      )}
                    />
                  </div>
                  <div className="w-[440px]">
                    <label className="text-[2rem]  text-black font-bold mb-2 block">Upload file</label>
                    <input name="image" accept=".jpeg,.jpg,.png,.svg,.webp"
                      onChange={(e) => {
                        const file = e.target.files;
                        if (file) {
                          reset({
                            ...getValues(), // Giữ nguyên các giá trị hiện tại của form
                            image: file,    // Cập nhật giá trị cho trường `image`
                          });
                        }
                      }} type="file"
                      className="w-[440px] text-gray-400 font-semibold text-xl bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-6 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
                    <p className="text-[12px] text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                  </div>
                  {/* <div>
                    <label className="block font-medium text-gray-700 text-3xl">
                      Hình ảnh (Tải lên tệp)
                    </label>
                    <input
                      name="image"
                      type="file"
                      accept=".jpeg,.jpg,.png,.svg,.webp"
                      onChange={(e) => {
                        const file = e.target.files;
                        if (file) {
                          reset({ image: file });
                        }
                      }}
                    />
                  </div> */}
                </div>

                <div className="flex justify-end gap-6 px-7 mt-12 items-center">
                  <button
                    type="submit"
                    className="text-black text-[14px] max-lg:text-[12px] leading-[166.667%] font-manrope py-4 px-12 bg-[#FFD44D] rounded-xl flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Thêm danh mục"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// Hàm để xử lý thông điệp lỗi
const isErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  // Nếu là FetchBaseQueryError
  if ('status' in error) {
    const data = error.data as { error?: string; message?: string }; // Ép kiểu
    return data?.error || data?.message || "Đã xảy ra lỗi không xác định";
  }

  // Nếu là SerializedError
  if ('message' in error) {
    return error.message || "Đã xảy ra lỗi không xác định";
  }

  // Trường hợp không khớp kiểu
  return "Đã xảy ra lỗi không xác định";
};
