import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CircularProgress, MenuItem, Select, Button } from '@mui/material';
import { useDeleteCategoryMutation, useGetCategoriesQuery, useGetCategoryDetailQuery, useUpdateCategoryMutation } from '@/services/authApi';
import FormField from '@/components/FormField';
import TextInputs from '@/components/FormInputs/TextInputs';

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
  const categories = Array.isArray(categoriesData?.categories) ? categoriesData.categories : [];

  useEffect(() => {
    if (data?.success && data.category) {
      reset({
        id: data.category.id, // Thêm ID vào reset
        name: data.category.name,
        slug: data.category.slug,
        parent_id: data.category.parent_id || "",
      });
    }
  }, [data, reset]);

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
      toast.error("Cập nhật thể loại thất bại");
    }
  };

  // Hàm để xoá thể loại con
  const handleDeleteCategory = async (childId: string) => {
    try {
      await deleteCategory(childId).unwrap();
      toast.success("Xóa thể loại thành công");
      // Có thể thêm logic để cập nhật lại danh sách thể loại
    } catch (err) {
      console.error("Lỗi khi xóa thể loại:", err);
      toast.error("Xóa thể loại thất bại");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        {/* Các trường nhập liệu cho thể loại chính */}
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
        <div className="flex flex-col">
          <label>Chọn danh mục cha</label>
          <Controller
            name="parent_id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} displayEmpty sx={{ width: "340px" }}>
                <MenuItem value="">
                  <em>Không chọn</em>
                </MenuItem>
                {categories
                  .filter((category) => category.parent_id === 0)
                  .map((parentCategory) => {
                    const hasChildren = categories.some((childCategory) => childCategory.parent_id === parentCategory.id);
                    return (
                      <MenuItem key={parentCategory.id} value={parentCategory.id} disabled={hasChildren}>
                        {parentCategory.name} {hasChildren ? "(Không thể chọn)" : ""}
                      </MenuItem>
                    );
                  })}
              </Select>
            )}
          />
        </div>

        <div className="mt-4 w-full lg:w-auto">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div>
                <FormField<FormData>
                  label="Hình ảnh"
                  Component={TextInputs}
                  control={control}
                  type="file"
                  error={errors.image}
                  {...field}
                />
              </div>
            )}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Các thể loại con</h3>
          {data?.category?.children && data.category.children.length > 0 ? (
            <ul>
              {data.category.children.map((child) => (
                <li key={child.id} className="flex justify-between items-center">
                  <span>{child.name}</span>
                  <Button onClick={() => handleDeleteCategory(child.id)} color="error">
                    Xoá
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có thể loại con nào.</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
