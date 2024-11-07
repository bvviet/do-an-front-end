import { useAddBrandMutation, useGetAllBrandQuery } from "@/services/productApi";
import { AddIBrand } from "@/types/brand";
import { useTabContext } from "@/contexts/TabContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";

export default function AddBrand() {
    const [addBrand, { isLoading }] = useAddBrandMutation();
    const { refetch } = useGetAllBrandQuery();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddIBrand>();
    const { setValue } = useTabContext();

    const onSubmit: SubmitHandler<AddIBrand> = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);

        if (data.image && (data.image instanceof FileList && data.image.length > 0)) {
            formData.append("image", data.image[0]); // Thêm ảnh đầu tiên từ FileList
        } else if (data.image instanceof File) {
            formData.append("image", data.image); // Thêm ảnh trực tiếp nếu là File
        }

        try {
            // Thêm brand mới
            await addBrand(formData).unwrap();
            toast.success("Brand đã được thêm thành công!");

            // Gọi lại API để lấy danh sách brand mới
            refetch();

            setValue("1");
            reset();
        } catch {
            toast.error("Đã xảy ra lỗi khi thêm brand.");
        }
    };

    return (
        <>
            <div className="mx-auto h-[632px] max-w-screen-xl rounded-lg bg-white px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto  text-center">
                    <h1 className="text-[32px] font-bold ">Thêm thương hiệu!</h1>
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
                    <div >
                        <TextField
                            id="outlined-helperText"
                            label="Mô tả"
                            className="w-full"
                            {...register("description")}
                        />

                    </div>
                    <div className="">
                        <label htmlFor="image" className="font-bold leading-[150%] text-[2rem] text-black">
                            Ảnh
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            {...register("image")}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="text-black text-[14px] max-lg:text-[12px] leading-[166.667%] font-manrope py-4 px-12 bg-[#FFD44D] rounded-xl flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                "Thêm thương hiệu"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
