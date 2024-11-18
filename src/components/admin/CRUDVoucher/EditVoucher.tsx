import { useForm, SubmitHandler } from "react-hook-form";
import { AddVoucherBase, IVoucher } from "@/types/voucher";
import { toast } from "react-toastify";
import { TextField, Select, MenuItem, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useUpdateVoucherMutation } from "@/services/productApi";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditVoucherComponent() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<AddVoucherBase>();
    const [updateVoucher, { isLoading }] = useUpdateVoucherMutation();
    const [voucher, setVoucher] = useState<IVoucher>()
    const navi = useNavigate()
    // Khai báo state applicableIds để lưu mảng các ID sản phẩm
    const [applicableIds, setApplicableIds] = useState<number[]>([]);
    const { id } = useParams()

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        //  chuyển đổi theo múi giờ địa phương
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return localDate.toISOString().split("T")[0]; // Chuyển về định dạng YYYY-MM-DD
    };
    useEffect(() => {
        if (voucher) {
            reset({
                name: voucher.name,
                minimum_order_value: voucher.minimum_order_value,
                discount_value: voucher.discount_value,
                start_date: formatDate(voucher.start_date),
                end_date: formatDate(voucher.end_date),
                applicable_type: voucher.applicable_type === "category" || voucher.applicable_type === "product"
                    ? voucher.applicable_type
                    : undefined, // Chuyển giá trị không hợp lệ thành undefined
                usage_limit: voucher.usage_limit,
                discount_type: voucher.discount_type,
                voucher_active: voucher.voucher_active,
            });
            if (Array.isArray(voucher.applicable_ids)) {
                // Nếu đã là mảng, gán trực tiếp
                setApplicableIds(voucher.applicable_ids);
            } else if (typeof voucher.applicable_ids === "string") {
                // Nếu là chuỗi, chuyển đổi sang mảng
                const ids = voucher.applicable_ids
                    .replace(/[[\]]/g, "") // Loại bỏ dấu ngoặc vuông
                    .split(",") // Chia thành mảng
                    .map(id => Number(id.trim())); // Chuyển thành số
                setApplicableIds(ids);
            } else {
                // Mặc định gán mảng rỗng nếu kiểu không khớp
                setApplicableIds([]);
            }
        }
    }, [voucher, reset]);
    // Hàm xử lý submit form
    const voucherId = id ? Number(id) : 0;
    const onSubmit: SubmitHandler<AddVoucherBase> = async (data) => {
        try {
            // Dữ liệu truyền vào updateVoucher phải là Partial<IVoucher>
            const voucherData: Partial<AddVoucherBase> = {
                ...data,
                applicable_ids: applicableIds, // Giữ kiểu là number[]
            };

            // Gửi request cập nhật
            await updateVoucher({ id: voucherId, data: voucherData }).unwrap();
            setTimeout(() => {
                toast.success("Cập nhật voucher thành công!");
            }, 2000);

            // Điều hướng sau khi hiển thị thông báo
            setTimeout(() => {
                navi("/admin/voucher");
            }, 2000);
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi khi cập nhật voucher.");
        }
    };


    const getDetail = async (id: string) => {

        try {
            const { data } = await axios.get('http://127.0.0.1:8000/api/voucher/' + id);
            const parsedApplicableIds = JSON.parse(data.applicable_ids); // Chuyển đổi chuỗi thành mảng
            setVoucher({ ...data, applicable_ids: parsedApplicableIds }); // Gán lại giá trị đã chuyển đổi vào state
        } catch (error) {
            console.error(error);
            toast.error("Đã có lỗi xảy ra");
        }

    }
    useEffect(() => {
        if (!id) return
        getDetail(id)
    }, [id])

    // Hàm xử lý khi người dùng nhập ID sản phẩm vào TextField
    const handleApplicableIdsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        // Tách các giá trị cách nhau bởi dấu phẩy, loại bỏ khoảng trắng, và kiểm tra tính hợp lệ của số
        const ids = inputValue
            .split(",")
            .map(id => id.trim())  // Loại bỏ khoảng trắng ở đầu và cuối
            .filter(id => !isNaN(Number(id)))  // Loại bỏ giá trị trống và không phải là số
            .map(id => Number(id));  // Chuyển chuỗi thành số

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
                <h1 className="text-[32px] font-bold ">Sửa Voucher!</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-2 gap-6">
                    <TextField
                        label="Tên Voucher"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        {...register("name", { required: "Tên voucher không được để trống" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Đơn tối thiểu"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        placeholder="Áp dụng cho những đơn có giá trị tối thiểu"
                        {...register("minimum_order_value", { required: "Giá trị không được để trống" })}
                        error={!!errors.minimum_order_value}
                        helperText={errors.minimum_order_value?.message}
                    />

                    <TextField
                        label="Giảm giá (%)"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
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
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        value={applicableIds.join(",")}  // Hiển thị mảng ID đã nhập dưới dạng chuỗi
                        onChange={handleApplicableIdsChange}  // Gọi hàm handle khi có thay đổi

                    />
                    <Select
                        label="Loại áp dụng"
                        {...register("applicable_type", { required: "Chọn loại áp dụng" })}
                        value={watch("applicable_type") || "product"} // Sử dụng watch để lấy giá trị hiện tại
                    >
                        <MenuItem value="category">Category</MenuItem>
                        <MenuItem value="product">Product</MenuItem>
                    </Select>



                    <TextField
                        label="Giới hạn sử dụng"
                        type="number"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
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
                            "Thêm thương hiệu"
                        )}
                    </button>

                </div>
            </form>
        </div>
    );
}
