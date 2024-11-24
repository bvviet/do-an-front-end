import { useForm, SubmitHandler } from "react-hook-form";
import { AddVoucherBase } from "@/types/voucher";
import { toast } from "react-toastify";
import { TextField, Select, MenuItem, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useAddVoucherMutation } from "@/services/productApi";
import { useTabContext } from "@/contexts/TabContext";


export default function AddVoucherComponent() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<AddVoucherBase>();
    const [addVoucher, { isLoading }] = useAddVoucherMutation();
    const { setValue } = useTabContext();
    // Khai báo state applicableIds để lưu mảng các ID sản phẩm
    const [applicableIds, setApplicableIds] = useState<number[]>([]);

    // Hàm xử lý submit form
    const onSubmit: SubmitHandler<AddVoucherBase> = async (data) => {
        try {
            // Chuyển applicableIds thành mảng các ID (nếu chưa có)
            const voucherData = {
                ...data,
                applicable_ids: applicableIds,  // Truyền mảng trực tiếp
            };
            const voucherDataJson = JSON.stringify(voucherData);
            // Gọi hàm addVoucher để gửi dữ liệu lên server
            await addVoucher(voucherDataJson).unwrap(); // Sử dụng voucherData trực tiếp
            toast.success("Thêm voucher thành công!");
            setValue("1");
            reset(); // Reset form sau khi thêm thành công
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi khi thêm voucher.");
        }
    };

    // Hàm xử lý khi người dùng nhập ID sản phẩm vào TextField
    const handleApplicableIdsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const ids = inputValue
            .split(",")
            .map(id => id.trim())
            .filter(id => !isNaN(Number(id)))
            .map(id => Number(id));
        setApplicableIds(ids);
    };
    const [today, setToday] = useState<string>("");
    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0];  // Lấy ngày hiện tại ở định dạng yyyy-mm-dd
        setToday(currentDate);  // Cập nhật state today
    }, []);
    return (
        <div className="mx-auto h-fit max-w-screen-xl rounded-lg bg-white px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto  text-center mb-12">
                <h1 className="text-[32px] font-bold ">Thêm Voucher!</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-2 gap-6">
                    <TextField
                        label="Tên Voucher"
                        {...register("name", { required: "Tên voucher không được để trống" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Đơn tối thiểu"
                        type="number"
                        placeholder="Áp dụng cho những đơn có giá trị tối thiểu"
                        {...register("minimum_order_value", { required: "Giá trị không được để trống" })}
                        error={!!errors.minimum_order_value}
                        helperText={errors.minimum_order_value?.message}
                    />

                    <TextField
                        label="Giảm giá (%)"
                        type="number"
                        {...register("discount_value", {
                            required: "Giảm giá không được để trống",
                            min: {
                                value: 1,
                                message: "Giảm giá phải tối thiểu 1%"
                            },
                            max: {
                                value: 99,
                                message: "Giảm giá không được vượt quá 99%"
                            }
                        })}
                        error={!!errors.discount_value}
                        helperText={errors.discount_value?.message}
                    />
                    <TextField
                        label="Ngày bắt đầu"
                        type="date"
                        inputProps={{
                            min: today,  // Giới hạn ngày bắt đầu không được nhỏ hơn ngày hôm nay
                        }}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        {...register("start_date", { required: "Ngày bắt đầu không được để trống" })}
                        error={!!errors.start_date}
                        helperText={errors.start_date?.message}
                    />
                    <TextField
                        label="Ngày kết thúc"
                        type="date"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        inputProps={{
                            min: today,  // Giới hạn ngày bắt đầu không được nhỏ hơn ngày hôm nay
                        }}
                        {...register("end_date", {
                            required: "Ngày kết thúc không được để trống",
                            validate: {
                                // Kiểm tra ngày kết thúc lớn hơn ngày bắt đầu ít nhất 1 ngày
                                endDateAfterStartDate: (value) => {
                                    const startDate = new Date(watch("start_date"));
                                    const endDate = new Date(value);

                                    if (endDate <= startDate) {
                                        return "Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày";
                                    }

                                    return true; // Nếu validation đúng
                                }
                            }
                        })}
                        error={!!errors.end_date}
                        helperText={errors.end_date?.message}
                    />
                    <TextField
                        label="Danh sách áp dụng"
                        placeholder="Nhập ID sản phẩm (ví dụ: 1, 2, 3)"
                        value={applicableIds.join(",")}  // Hiển thị mảng ID đã nhập dưới dạng chuỗi
                        onChange={handleApplicableIdsChange}  // Gọi hàm handle khi có thay đổi

                    />
                    <Select
                        label="Loại áp dụng"
                        {...register("applicable_type", { required: "Chọn loại áp dụng" })}
                        defaultValue="product"
                    >
                        <MenuItem value="category">Category</MenuItem>
                        <MenuItem value="product">Product</MenuItem>
                    </Select>



                    <TextField
                        label="Giới hạn sử dụng"
                        type="number"
                        {...register("usage_limit", { required: "Giới hạn sử dụng không được để trống" })}
                        error={!!errors.usage_limit}
                        helperText={errors.usage_limit?.message}
                    />

                    <TextField
                        className="sr-only"
                        label="Giảm giá theo"
                        type="text"
                        defaultValue={"percent"}
                        {...register("discount_type", { required: "Giảm giá không được để trống" })}
                        error={!!errors.discount_type}
                        helperText={errors.discount_type?.message}
                    />
                    <div>
                        <FormControlLabel control={<Switch defaultChecked />} {...register("voucher_active")} label="Active" />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="text-black text-[14px] disabled:bg-[#FFD44D] disabled:opacity-50 max-lg:text-[12px] leading-[166.667%] font-manrope py-4 px-12 bg-[#FFD44D] rounded-xl flex items-center justify-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                            "Thêm Voucher"
                        )}
                    </button>

                </div>
            </form>
        </div>
    );
}
