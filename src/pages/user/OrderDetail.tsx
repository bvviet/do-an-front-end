/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import {
  useCancelOrderUserMutation,
  useGetOrderDetailUserQuery,
} from "@/services/productApi";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const id = Number(orderId);

  const {
    data: orderDetail,
    isLoading,
    refetch,
  } = useGetOrderDetailUserQuery(id);

  useEffect(() => {
    refetch();
  }, [id]);

  const [cancelOrder, { isLoading: loadingCancelOrder }] =
    useCancelOrderUserMutation();

  useEffect(() => {
    dispatch(setLoading(isLoading || loadingCancelOrder));
  }, [dispatch, isLoading, loadingCancelOrder]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  // Hàm xử lý submit form
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const res = await cancelOrder({
        orderId: id,
        note: data.reason,
      }).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Hủy đơn hàng thất bại";
      toast.error(errorMessage);
    }
    handleCloseDialog();
  };

  const getOrderStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "processing":
        return "Đã xác nhận";
      case "shipping":
        return "Đang vận chuyển";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const getOrderStatusClass = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-[#88C273]";
      case "shipping":
        return "bg-purple-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container">
      {/* List */}
      <div className="mb-[100px]">
        <span
          className={`rounded-lg px-8 py-3 font-medium text-white ${getOrderStatusClass(orderDetail?.order_status ?? "")}`}
        >
          {getOrderStatus(orderDetail?.order_status ?? "")}
        </span>
        {/* Item Group */}
        <div className="flex flex-col gap-10 rounded-md bg-slate-100 p-8">
          {/* Item */}
          {orderDetail?.order_items?.map((orderItem, index) => (
            <div
              key={index}
              className="flex items-center gap-6 border-b-2 border-solid border-b-[#ccc] pb-6"
            >
              <div className="h-[150px] w-[10%]">
                <img
                  src={orderItem.img_thumbnail}
                  alt=""
                  className="h-full w-full rounded object-cover"
                />
              </div>
              <div className="flex w-[75%] flex-col gap-2">
                <Link to={"/#!"}>
                  <h3 className="font-medium">{orderItem.product_name}</h3>
                </Link>
                <div>Phân loại: {orderItem.size}</div>
                <div className="flex items-center gap-3">
                  Màu:{" "}
                  <span
                    style={{ backgroundColor: orderItem.color }}
                    className="inline-block h-6 w-8 rounded-md"
                  ></span>
                </div>
                <div>X{orderItem.quantity}</div>
              </div>
              <div className="flex gap-3">
                <span className="font-medium text-[#636261aa] line-through">
                  {orderItem.price_sale}
                </span>
                <span className="font-medium text-[#ee4d2d]">
                  {orderItem.price_regular}
                </span>
              </div>
            </div>
          ))}

          {/* Tổng tiền, button */}
          <div className="ml-auto">
            <div className="flex justify-end">
              Số tiền phải trả:
              <span className="font-medium text-[#ee4d2d]">
                {orderDetail?.total_amount}
              </span>
            </div>
            <div className="mt-6 flex justify-end gap-6">
              <Button variant="outlined">Thanh toán khi nhận hàng</Button>
              <Button
                variant="contained"
                onClick={handleOpenDialog}
                disabled={
                  orderDetail?.order_status === "cancelled" ||
                  orderDetail?.order_status === "delivered" ||
                  orderDetail?.order_status === "shipping"
                }
              >
                Hủy đơn hàng
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Chọn lý do hủy đơn hàng</DialogTitle>
        <DialogContent>
          {/* Form của react-hook-form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {/* Lý do 1 */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="no-buy"
                value="Tôi không muốn mua nữa"
                {...register("reason", { required: "Vui lòng chọn một lý do" })}
              />
              <label htmlFor="no-buy" className="text-[1.7rem] font-medium">
                Tôi không muốn mua nữa
              </label>
            </div>
            {/* Lý do 2 */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="change-product"
                value="Tôi muốn đổi sản phẩm khác"
                {...register("reason", { required: "Vui lòng chọn một lý do" })}
              />
              <label
                htmlFor="change-product"
                className="text-[1.7rem] font-medium"
              >
                Tôi muốn đổi sản phẩm khác
              </label>
            </div>
            {/* Lý do 3 */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="change-address"
                value="Tôi muốn cập nhật số điện địa chỉ / số điện thoại"
                {...register("reason", { required: "Vui lòng chọn một lý do" })}
              />
              <label
                htmlFor="change-address"
                className="text-[1.7rem] font-medium"
              >
                Tôi muốn cập nhật số điện địa chỉ / số điện thoại
              </label>
            </div>
            {/* Lý do 4 */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="change-payment"
                value="Tôi muốn thay đổi phương thức thanh toán"
                {...register("reason", { required: "Vui lòng chọn một lý do" })}
              />
              <label
                htmlFor="change-payment"
                className="text-[1.7rem] font-medium"
              >
                Tôi muốn thay đổi phương thức thanh toán
              </label>
            </div>
            {/* Lý do 5 */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="other-reasons"
                value="Lý do khác"
                {...register("reason", { required: "Vui lòng chọn một lý do" })}
              />
              <label
                htmlFor="other-reasons"
                className="text-[1.7rem] font-medium"
              >
                Lý do khác
              </label>
            </div>
            {/* Hiển thị lỗi nếu không chọn */}
            {errors.reason && (
              <span className="text-red-500">Vui lòng chọn 1 lý do</span>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          {/* Nút submit form */}
          <Button
            type="submit"
            form="dialog-form"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderDetail;
