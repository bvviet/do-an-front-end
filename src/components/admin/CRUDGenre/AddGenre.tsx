import FormField from "@/components/FormField";
import TextInputs from "@/components/FormInputs/TextInputs";
import { useAddCategoryMutation, useGetCategoriesQuery } from "@/services/authApi";
import { ICategory } from "@/types/genre";
import { MenuItem, Select } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Định nghĩa kiểu dữ liệu cho các trường của form
interface FormData {
  name: string;
  parent_id: number | null;
  image: FileList | null;
}

export default function AddCategory() {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [addCategory, { isLoading, error }] = useAddCategoryMutation();
  const navi = useNavigate();
  const { data: categories = [] } = useGetCategoriesQuery();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Tạo đối tượng FormData
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image) {
        formData.append("image", data.image[0]);
      }

      // Chỉ thêm parent_id nếu có giá trị khác null
      if (data.parent_id !== null) {
        formData.append("parent_id", data.parent_id.toString());
      }

      console.log("data add:", data);
      const newCategory = await addCategory(formData).unwrap();
      console.log("Danh mục đã được thêm:", newCategory);
      toast.success("Tạo thể loại thành công");
      reset(); // Đặt lại biểu mẫu sau khi thêm thành công
      setTimeout(() => navi("/admin/genre"), 3000);
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
                <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                  <div>
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
                  <div>
                    <label>Chọn danh mục cha</label>
                    <Controller
                      name="parent_id"
                      control={control}
                      defaultValue={null} // Đặt giá trị mặc định là null
                      render={({ field }) => (
                        <Select {...field} displayEmpty>
                          <MenuItem value={null}>
                            <em>Không chọn</em>
                          </MenuItem>
                          {Array.isArray(categories?.categories)
                            ? categories.categories
                              .filter((category) => category.parent_id === null)
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hình ảnh (Tải lên tệp)
                    </label>
                    <input
                      name="image"
                      type="file"
                      accept=".jpeg,.jpg,.png,.svg,.webp"
                      onChange={(e) => {
                        const file = e.target.files;
                        if (file) {
                          // Cập nhật hình ảnh vào trường image
                          reset({ image: file });
                        }
                      }}
                    />
                  </div>
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
                    {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
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
