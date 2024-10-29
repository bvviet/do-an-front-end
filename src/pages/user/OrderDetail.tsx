/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { Link, useParams } from "react-router-dom";
// import {
//   useCancelOrderUserMutation,
//   useGetOrderDetailUserQuery,
// } from "@/services/productApi";
// import { useDispatch } from "react-redux";
// import { setLoading } from "@/redux/slices/loadingSlice";
// import { toast } from "react-toastify";

import OrderFail from "./OrderFail";

const OrderDetail = () => {
  // const [openDialog, setOpenDialog] = useState(false);
  // const dispatch = useDispatch();
  // const { orderId } = useParams();
  // const id = Number(orderId);

  // const {
  //   data: orderDetail,
  //   isLoading,
  //   refetch,
  // } = useGetOrderDetailUserQuery(id);

  // useEffect(() => {
  //   refetch();
  // }, [id]);

  // const [cancelOrder, { isLoading: loadingCancelOrder }] =
  //   useCancelOrderUserMutation();

  // useEffect(() => {
  //   dispatch(setLoading(isLoading || loadingCancelOrder));
  // }, [dispatch, isLoading, loadingCancelOrder]);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();

  // const handleOpenDialog = () => {
  //   setOpenDialog(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  //   reset();
  // };

  // // Hàm xử lý submit form
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const onSubmit = async (data: any) => {
  //   try {
  //     const res = await cancelOrder({
  //       orderId: id,
  //       note: data.reason,
  //     }).unwrap();
  //     refetch();
  //     toast.success(res.message);
  //   } catch (error: any) {
  //     const errorMessage = error?.data?.message || "Hủy đơn hàng thất bại";
  //     toast.error(errorMessage);
  //   }
  //   handleCloseDialog();
  // };

  // const getOrderStatus = (status: string) => {
  //   switch (status) {
  //     case "pending":
  //       return "Chờ xác nhận";
  //     case "processing":
  //       return "Đã xác nhận";
  //     case "shipping":
  //       return "Đang vận chuyển";
  //     case "cancelled":
  //       return "Đã hủy";
  //     default:
  //       return "Không xác định";
  //   }
  // };

  // const getOrderStatusClass = (status: string): string => {
  //   switch (status) {
  //     case "pending":
  //       return "bg-yellow-500";
  //     case "processing":
  //       return "bg-[#88C273]";
  //     case "shipping":
  //       return "bg-purple-500";
  //     case "cancelled":
  //       return "bg-red-500";
  //     default:
  //       return "bg-gray-500";
  //   }
  // };

  return (
    <div className="container mb-12 ">
      {/* List */}
      <div className="rounded-lg px-8 flex items-center justify-between py-6 bg-white">
        <div className="flex items-center text-gray-500  hover:underline">
          <i className="fa-solid fa-arrow-left pr-2"></i>
          <p>Trở Lại</p>
        </div>
        <div className="flex items-center">
          <div>
            Mã đơn hàng: 241024D9PHXFSY(+id)
          </div>
          <div className="bg-gray-400 w-[1px] h-[20px] mx-3"></div>
          <p className="text-red-600">Hoàn Thành</p>
        </div>
      </div>
      {/* Địa chỉ nhận hàng */}
      <div className="bg-white border-solid border-gray-100 border py-4 rounded-lg flex flex-col items-center">
        <p className="text-[24px]">Địa chỉ nhận hàng</p>
        <div className="text-left grid grid-col gap-2 ">
          <p>Vũ Tiến Việt</p>
          <p className="text-gray-400 text-[14px]">0328692374</p>
          <p className="text-gray-400 text-[14px]">Phong Thành - Đồng Phong - Nho Quan - Ninh Bình</p>
        </div>
      </div>
      {/* items sản phẩm */}
      <div className="bg-[#fafafa]  pt-4">
        <div className="flex items-center justify-between px-8 gap-6 py-4">
          <div className="flex items-center gap-6">
            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/464675707_1098176495005594_4245022722692694157_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=73wlivyRWwgQ7kNvgFFvPDE&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AgsVz-mSGOR5J_1ZRXJjcjd&oh=00_AYDLm5uUaBrQ7xrb8U0NVS2wkTSuUAz7CKGOMKcuJ0WtpA&oe=67260D9E" alt="" className="w-[82px]" />

            <div className="flex-1 max-w-[702px]">
              <p>Ốp iPhone Pikachu siêu trong suốt: mặt lưng nhựa cứng chống ố, viền silicon chống sốc, chống va đập - Pikapi phụ kiện</p>
              <p className="text-gray-500">Phụ kiện</p>
              <p>x1</p>

              <button className="inline-block rounded border border-solid border-[#26aa99] px-4 text-[12px] font-medium text-[#26aa99] hover:bg-[#26aa99] hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                Hoàn trả hàng miễn phí 15 ngày
              </button>
            </div>
          </div>

          <div className="flex flex-cols-2 gap-4 items-end space-y-1">
            <span className="text-gray-400 line-through">₫39.000</span>
            <span className="text-red-600 font-bold">₫28.900</span>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-[1px]"></div>
        <div className="flex items-center justify-between px-8 gap-6 py-4">
          <div className="flex items-center gap-6">
            <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/464675707_1098176495005594_4245022722692694157_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=73wlivyRWwgQ7kNvgFFvPDE&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AgsVz-mSGOR5J_1ZRXJjcjd&oh=00_AYDLm5uUaBrQ7xrb8U0NVS2wkTSuUAz7CKGOMKcuJ0WtpA&oe=67260D9E" alt="" className="w-[82px]" />

            <div className="flex-1 max-w-[702px]">
              <p>Ốp iPhone Pikachu siêu trong suốt: mặt lưng nhựa cứng chống ố, viền silicon chống sốc, chống va đập - Pikapi phụ kiện</p>
              <p className="text-gray-500">Phụ kiện</p>
              <p>x1</p>

              <button className="inline-block rounded border border-solid border-[#26aa99] px-4 text-[12px] font-medium text-[#26aa99] hover:bg-[#26aa99] hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                Hoàn trả hàng miễn phí 15 ngày
              </button>
            </div>
          </div>

          <div className="flex flex-cols-2 gap-4 items-end space-y-1">
            <span className="text-gray-400 line-through">₫39.000</span>
            <span className="text-red-600 font-bold">₫28.900</span>
          </div>
        </div>
        {/* Tính tiền  */}
        <div className=" flex items-center">
          <div className="w-[70%] text-[16px] text-gray-500 pr-8  py-5 text-right border border-solid border-gray-200">
            <p>Tổng tiền hàng</p>
          </div>
          <div className="w-[30%] pr-8 py-5 text-right font-semibold  border border-solid border-gray-200">
            <p>28.000</p>
          </div>
        </div>
        <div className=" flex items-center">
          <div className="w-[70%] text-[16px] text-gray-500 pr-8  py-5 text-right border border-solid border-gray-200">
            <p>Phí vận chuyển</p>
          </div>
          <div className="w-[30%] pr-8 py-5 text-right font-semibold border border-solid border-gray-200">
            <p>10.000</p>
          </div>
        </div>
        <div className=" flex items-center">
          <div className="w-[70%] text-[16px] text-gray-500 pr-8  py-5 text-right border border-solid border-gray-200">
            <p>Giảm giá</p>
          </div>
          <div className="w-[30%] pr-8 py-5 text-right font-semibold border border-solid border-gray-200">
            <p>-18.000</p>
          </div>
        </div>
        <div className=" flex items-center max-h-[50px]">
          <div className="w-[70%] text-[16px] text-gray-500 pr-8  py-5 text-right  border  border-solid border-gray-200">
            <p>Thành tiền</p>
          </div>
          <div className="w-[30%] text-[22px] pr-8 py-5 font-semibold text-right text-red-600  border-l border-solid border-gray-200">
            <span>₫20.000</span>
          </div>
        </div>
        <div className=" flex items-center">
          <div className="w-[70%] text-[16px] text-gray-500 pr-8  py-5 text-right border border-solid border-gray-200">
            <p>Phương thức thanh toán</p>
          </div>
          <div className="w-[30%] pr-8 py-5 text-right font-semibold border border-solid border-gray-200">
            <p>Thanh toán khi nhận hàng</p>
          </div>
        </div>
      </div>
      {/* Đơn hàng đã huỷ */}
      <OrderFail />
    </div>
  );
};

export default OrderDetail;
