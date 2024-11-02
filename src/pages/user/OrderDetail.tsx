/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import {
  useCancelOrderUserMutation,
  useGetOrderDetailUserQuery,
} from "@/services/productApi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { toast } from "react-toastify";
import HorizontalStepperWithError from "./Stepper";
import useDateFormatter from "@/hooks/useDateFormatter";

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
      case "delivered":
        return "Đã giao hàng";
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
      case "delivered":
        return "bg-[#48673c]";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const { formatDate } = useDateFormatter();

  return (
    <div className="container">
      <div className="mb-1 rounded-md bg-slate-100 py-6 shadow-sm">
        <Link to={"/orders"} className="p-5">
          <ArrowBackIcon />
          Trở về
        </Link>
      </div>
      {/* Stepper */}
      {orderDetail?.order_status === "cancelled" ? (
        ""
      ) : (
        <div className="mb-2 rounded-md bg-slate-100 py-6 shadow-sm">
          <HorizontalStepperWithError status={orderDetail?.order_status} />
        </div>
      )}
      {/* Địa chỉ giao hàng */}
      <div>
        <Card sx={{ margin: 2 }} className="bg-slate-50">
          <CardContent className="bg-slate-50">
            <Typography variant="h5" gutterBottom>
              Thông tin mua hàng
            </Typography>
            <Typography variant="body1">
              <strong>Đơn hàng ID:</strong> 1
            </Typography>
            <Typography variant="body1">
              <strong>Ngày đặt hàng:</strong>
              {formatDate(orderDetail?.created_at)}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
              Thông tin người mua
            </Typography>
            <Typography variant="body1">
              <strong>Tên:</strong> {orderDetail?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {orderDetail?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Số điện thoại:</strong>{" "}
              {orderDetail?.address.phone_number}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
              Địa chỉ giao hàng
            </Typography>
            <Typography variant="body1">
              {orderDetail?.address.detail_address} -{orderDetail?.address.ward}{" "}
              - {orderDetail?.address.district} - {orderDetail?.address.city}
            </Typography>
          </CardContent>
        </Card>
      </div>
      {/* List */}
      <div className="mb-[100px] shadow-sm">
        {/* Nhãn đã hủy */}
        {orderDetail?.order_status === "cancelled" ? (
          <div
            className={`ml-auto w-fit rounded-lg px-8 py-3 font-medium text-white ${getOrderStatusClass(orderDetail?.order_status ?? "")}`}
          >
            {getOrderStatus(orderDetail?.order_status ?? "")}
          </div>
        ) : (
          ""
        )}
        {/* Item Group */}
        <div className="flex flex-col gap-10 rounded-md bg-slate-100 p-8">
          {/* Item */}
          {orderDetail?.order_items?.map((orderItem, index) => (
            <div
              key={index}
              className="gap-6 border-b-2 border-solid border-b-[#ccc] pb-6"
            >
              <div className="flex items-center">
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
              <div className="mt-3 flex gap-5">
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  sx={{ fontSize: "1rem", padding: "4px 8px" }}
                >
                  15 ngày trả hàng
                </Button>
                <Button
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ fontSize: "1rem", padding: "4px 8px" }}
                >
                  Trả hàng miễn phí 15 ngày
                </Button>
              </div>
            </div>
          ))}
          {/* Lý do hủy */}
          {orderDetail?.order_status === "cancelled" ? (
            <div className="font-medium">Lý do: {orderDetail?.note}</div>
          ) : (
            ""
          )}
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
