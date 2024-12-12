import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CircularProgress, MenuItem, Select, Tooltip } from '@mui/material';
import { useDeleteCategoryMutation, useGetCategoriesQuery, useGetCategoryDetailQuery, useUpdateCategoryMutation } from '@/services/authApi';
import FormField from '@/components/FormField';
import TextInputs from '@/components/FormInputs/TextInputs';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ICategory } from '@/types/genre';

interface FormData {
  id: string;
  name: string;
  slug: string;
  parent_id: string;
  image: string;
}

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetCategoryDetailQuery(id!);
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [deleteCategory] = useDeleteCategoryMutation();
  // Đảm bảo categories là một mảng
  const categories = Array.isArray(categoriesData?.data.categories) ? categoriesData.data.categories : [];
  console.log("cáda", categories);

  useEffect(() => {
    if (!isLoading && data?.success && data.categories?.length > 0) {
      const category = data.categories[0];
      reset({
        id: category.id,
        name: category.name,
        slug: category.slug,
        parent_id: category.parent_id || "",
      });
    }
  }, [isLoading, data, reset]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    toast.error("Lỗi khi lấy thông tin thể loại.");
    return null;
  }

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    // Kiểm tra tên và ID
    if (!formData.name) {
      toast.error("Trường name là bắt buộc.");
      return;
    }

    if (!id) {
      toast.error("Không tìm thấy ID thể loại.");
      return;
    }

    try {
      const jsonDataToSend: FormData = {
        id: formData.id,
        name: formData.name,
        slug: formData.slug,
        parent_id: formData.parent_id || "",
        image: formData.image || "",
      };

      const updateData = await updateCategory([jsonDataToSend, id]).unwrap();
      console.log(updateData);
      toast.success("Cập nhật thể loại thành công");
      setTimeout(() => {
        window.location.href = "/admin/genre"; // Redirects to the specified URL
      }, 2000);

    } catch (err) {
      console.error("Lỗi khi cập nhật danh mục:", err);
      toast.error(isErrorMessage(err as FetchBaseQueryError));
    }
  };

  // Hàm để xoá thể loại con
  const handleDeleteCategory = async (childId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission when deleting category

    try {
      await deleteCategory(childId).unwrap();
      toast.success("Xóa thể loại thành công");
      setTimeout(() => {
        window.location.href = "/admin/genre"
      }, 2000)
    } catch (err) {
      console.error("Lỗi khi xóa thể loại:", err);
      toast.error("Xóa thể loại thất bại");
    }
  };
  const hasChildren = data?.categories?.[0]?.children?.length > 0;
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 bg-white rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8  space-y-4 py-12 ">
        <div className='grid grid-cols-2 gap-12 items-center '>
          <div className="mt-4 w-full lg:w-auto">
            <FormField<FormData>
              label="Tên thể loại"
              name="name"
              placeholder="Tên thể loại"
              rules={{ required: "Trường name là bắt buộc." }}
              Component={TextInputs}
              control={control}
              error={errors.name}
            />
          </div>


          <div className="mt-4 w-full lg:w-auto">
            <FormField<FormData>
              label="Slug"
              name="slug"
              placeholder="Slug"
              Component={TextInputs}
              control={control}
              error={errors.slug}
            />
          </div>
          <div>

            <label className="text-[20px] font-bold text-black">Chọn danh mục cha</label>
            <div className="flex flex-col relative" >

              <Controller
                name="parent_id"
                control={control}
                defaultValue="" // Đặt giá trị mặc định là rỗng (Không chọn)
                render={({ field }) => (
                  <Select {...field} displayEmpty sx={{ width: "full" }} disabled={hasChildren} >
                    <MenuItem value="">
                      <em>Không chọn</em>
                    </MenuItem>
                    {categories
                      .filter((category: ICategory) =>
                        category.id !== data?.categories?.[0]?.id && category.name !== ('Danh mục lưu trữ')
                      ) // Lọc danh mục không chứa "Lưu trữ" và có children là mảng rỗng
                      .map((category: ICategory) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
              {hasChildren && (
                <Tooltip
                  title="Danh mục này có danh mục con, không thể chọn làm danh mục cha."
                  arrow
                  enterDelay={500} // Delay before Tooltip appears
                >
                  <span className="absolute left-full top-0 transform -translate-y-1/2 -translate-x-1/2 text-red-500 cursor-pointer">
                    <i className="fa-solid fa-circle-info"></i> {/* Icon thông báo */}
                  </span>
                </Tooltip>
              )}
            </div>
          </div>
          <div></div>
          <div className="overflow-x-auto ">
            <label className='text-[20px] font-semibold text-black pb-5' htmlFor="">Danh mục con</label>
            <table className="w-full text-left  divide-y-2 divide-gray-200  bg-white text-sm mt-6">
              <thead className="ltr:text-left rtl:text-right ">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-[18px] font-medium text-gray-900">ID</th>
                  <th className="whitespace-nowrap px-4 py-2 text-[18px] font-medium text-gray-900">Name</th>

                  <th className="px-4 py-2"></th>
                </tr>
              </thead>



              <tbody className="divide-y divide-gray-200 divide-solid">
                {data?.categories?.[0]?.children?.length ? (
                  // Lặp qua danh mục con
                  data.categories[0].children.map((child) => (
                    <tr key={child.id}>
                      <td className="whitespace-nowrap px-4 py-2 text-[18px]">{child.id}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-[18px]">{child.name}</td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={(e) => handleDeleteCategory(child.id, e)} // Pass the event to handleDeleteCategory
                          className="inline-block rounded bg-red-600 px-6 py-2 text-[14px] font-medium text-white hover:bg-red-700"
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-center">
                      Không có thể loại con nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-12">
          <div className='flex items-center justify-end'>
            <button
              type="submit"
              className="text-black text-[14px]  max-lg:text-[12px] leading-[166.667%] font-manrope py-4 px-12 bg-[#FFD44D] rounded-xl flex items-center justify-center gap-2"
              disabled={isUpdating}
            >
              {isUpdating ? <i className="fas fa-spinner fa-spin"></i> : "Cập nhật"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
const isErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  // Nếu là FetchBaseQueryError (lỗi xảy ra khi gọi API)
  if ('status' in error) {
    const data = error.data as { error?: string; message?: string }; // Ép kiểu
    if (data?.error) {
      return data.error;  // Nếu có thông báo lỗi riêng biệt
    }
    return data?.message || "Đã xảy ra lỗi không xác định";  // Nếu không có error, lấy message hoặc mặc định
  }

  // Nếu là SerializedError (lỗi từ Redux Toolkit)
  if ('message' in error) {
    return error.message || "Đã xảy ra lỗi không xác định";  // Trả về message hoặc mặc định
  }

  // Trường hợp không khớp kiểu
  return "Đã xảy ra lỗi không xác định";
};