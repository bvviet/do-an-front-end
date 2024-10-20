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
  parent_id: number;
  image: FileList | null;
}

export default function AddCategory() {
  const { control, handleSubmit, reset } = useForm<FormData>();
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
    <div className="h-auto rounded-xl bg-white px-2 pb-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-no-wrap flex items-start">
          <div className="w-full">
            <div className="px-2">
              <div className="py-7">
                <div className="flex flex-col items-center gap-8 ">
                  <div className="w-[340px]">
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
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Chọn danh mục cha</label>
                    <Controller
                      name="parent_id"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} displayEmpty sx={{ width: "340px" }}>
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
                  <div className="">
                    <label className="text-[2rem] text-black font-semibold mb-2 block">Upload file</label>
                    <input name="image" accept=".jpeg,.jpg,.png,.svg,.webp"
                      onChange={(e) => {
                        const file = e.target.files;
                        if (file) {
                          reset({ image: file });
                        }
                      }} type="file"
                      className="w-[340px] text-gray-400 font-semibold text-xl bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-6 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
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

                <div className="flex w-full flex-col flex-wrap items-center justify-center gap-x-4 gap-y-4 px-7 md:justify-end lg:flex-row lg:justify-end">
                  <button
                    type="button"
                    className="w-full transform rounded border border-solid border-indigo-700 bg-white px-6 py-4 text-xl font-medium text-indigo-700 duration-300 ease-in-out hover:bg-indigo-700 hover:text-white lg:max-w-[95px]"
                    onClick={() => reset()} // Reset form
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="w-full transform rounded bg-indigo-700 px-6 py-4 text-xl font-medium text-white duration-300 ease-in-out hover:bg-indigo-600 lg:max-w-[144px]"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={16} sx={{ color: "white" }} /> : 'Lưu thay đổi'}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500">
                    {isErrorMessage(error)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// Hàm để xử lý thông điệp lỗi
const isErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if ('status' in error) {
    return `Lỗi: ${error.status}, ${JSON.stringify(error.data)}`;
  } else {
    return error.message || "Đã xảy ra lỗi không xác định";
  }
};
