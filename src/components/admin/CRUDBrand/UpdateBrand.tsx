import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { BrandType } from "@/types/brand";
import { useGetAllBrandQuery, useGetDetailBrandQuery, useUpdateBrandMutation } from "@/services/productApi";
import { toast } from "react-toastify";
import { LinearProgress } from "@mui/material";
export default function EditBrand() {
    const { id } = useParams<{ id: string }>();  // id có thể là string, sẽ chuyển thành number khi cần thiết
    const { register, handleSubmit, reset, formState: { errors } } = useForm<BrandType>();
    const { refetch: refetchAllBrands } = useGetAllBrandQuery();
    const { data: brandData, isLoading: isFetching, error: fetchError, refetch: refetchBrandDetail } = useGetDetailBrandQuery(Number(id), {
        skip: !id,  // Skip query nếu không có id
    });
    const [updateBrand, { isLoading }] = useUpdateBrandMutation();

    useEffect(() => {
        if (brandData) {
            console.log("Brand Data received: ", brandData);  // Kiểm tra dữ liệu
            reset({
                name: brandData.data.name || "",  // Nếu name không có thì để chuỗi rỗng
                description: brandData.data.description || "",  // Nếu description là null thì gán chuỗi rỗng
            });
        }
    }, [brandData, reset]);

    const onSubmit = async (formData: BrandType) => {
        try {
            await updateBrand({ id: Number(id), data: formData }).unwrap();
            toast.success("Thương hiệu đã được cập nhật!");
            refetchBrandDetail();  // Gọi lại API để lấy dữ liệu chi tiết thương hiệu mới
            refetchAllBrands();
            setTimeout(() => {
                window.location.href = "/admin/brand";
            }, 2000);
        } catch (error) {
            console.error("Lỗi khi cập nhật thương hiệu:", error);
            toast.error("Có lỗi xảy ra khi cập nhật thương hiệu. Vui lòng thử lại.");
        }
    };

    useEffect(() => {
        if (id) {
            refetchBrandDetail();
        }
    }, [id, refetchBrandDetail]);

    if (isFetching) return <LinearProgress />;
    if (fetchError) return <LinearProgress />;

    return (
        <div className="mx-auto h-[632px] max-w-screen-xl rounded-lg bg-white px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto text-center">
                <h1 className="text-[32px] font-bold">Chỉnh sửa thương hiệu!</h1>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto mb-0 mt-8 max-w-3xl space-y-4 flex flex-col gap-10"
            >
                <div>
                    <TextField
                        id="outlined-helperText"
                        label="Tên thương hiệu"
                        className="w-full"
                        {...register("name", { required: "Tên thương hiệu không được để trống" })}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                </div>

                <div>
                    <TextField
                        id="description"
                        label="Mô tả"
                        className="w-full"
                        {...register("description")}
                    />
                </div>

                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        className="text-black text-[14px] max-lg:text-[12px] leading-[166.667%] font-manrope py-4 px-12 bg-[#FFD44D] rounded-xl flex items-center justify-center gap-2"
                        disabled={isLoading || isFetching}
                        aria-label="Cập nhật thương hiệu"
                    >
                        {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Cập nhật thương hiệu"}
                    </button>
                </div>
            </form>
        </div>
    );
}
