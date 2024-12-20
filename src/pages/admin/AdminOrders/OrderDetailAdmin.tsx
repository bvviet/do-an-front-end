import Confirm from "@/components/Confirm";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import useDateFormatter from "@/hooks/useDateFormatter";
import { setLoading } from "@/redux/slices/loadingSlice";
import {
  useCancelOrderUserMutation,
  useGetDetailOrderAdminQuery,
  useUpdateOrderStatusAdminMutation,
} from "@/services/productApi";
import { formatCurrency } from "@/utils/formatCurrency";
import { getOrderStatus } from "@/utils/getOrderStatus";
import paymentMethods from "@/utils/paymentMethods";
import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const statusUpdate = (status: string | undefined) => {
  switch (status) {
    case "pending":
      return "Xác nhận đơn hàng";
    case "processing":
      return "Giao cho đơn vị vận chuyển";
    default:
      return "Cập nhật trạng thái";
  }
};

const OrderDetailAdmin = () => {
  const { orderAdminId } = useParams();
  const id = Number(orderAdminId);
  const disPatch = useDispatch();
  const { openPopup } = useModalContext();
  const { formatDate } = useDateFormatter();

  const { data, isLoading, refetch } = useGetDetailOrderAdminQuery(id);
  const [updateStatus, { isLoading: isLoadingUpdateStatus }] =
    useUpdateOrderStatusAdminMutation();

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  // Cập nhật đơn hàng
  const handleUpdateStatus = async () => {
    try {
      if (data?.order_status === "pending") {
        const response = await updateStatus({
          orderId: id,
          status: "processing",
        }).unwrap();
        toast.success(response.message);
        refetch();
      } else if (data?.order_status === "processing") {
        const response = await updateStatus({
          orderId: id,
          status: "shipping",
        }).unwrap();
        toast.success(response.message);
        refetch();
      }
    } catch (error) {
      const fetchError = error as FetchBaseQueryError;

      if (fetchError.status === 422) {
        // Kiểm tra nếu `fetchError.data` có dạng `message`
        const errorMessage =
          (fetchError.data as { message?: string })?.message ||
          "Đã xảy ra lỗi không xác định";
        toast.error(errorMessage);
      } else {
        toast.error("Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng");
      }
    }
  };

  // Hủy đơn hàng
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setReason("");
  };
  const [cancelOrder, { isLoading: loadingCancelOrder }] =
    useCancelOrderUserMutation();
  const handleConfirmCancel = async () => {
    try {
      const res = await cancelOrder({
        orderId: id,
        note: reason,
      }).unwrap();
      refetch();
      toast.success(res.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Hủy đơn hàng thất bại";
      toast.error(errorMessage);
    }
    handleCloseDialog();
  };

  useEffect(() => {
    disPatch(
      setLoading(isLoading || isLoadingUpdateStatus || loadingCancelOrder),
    );
  }, [isLoading, isLoadingUpdateStatus, loadingCancelOrder, disPatch]);

  return (
    <div className="overflow-x-auto">
      {/* Thêm overflow-x-auto ở đây */}
      <div className="my-4">
        <Link to={"/admin/orders"}>
          <ArrowBackIcon />
          Trở về
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card className="col-span-1 !bg-gray-100 p-6">
          <h2 className="text-[2rem] font-bold">1. Thông tin khách hàng</h2>
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-semibold">Tên người mua:</span>{" "}
              <span>{data?.name}</span>
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              <span>{data?.email}</span>
            </div>
            <div>
              <span className="font-semibold">Điện thoại:</span>{" "}
              <span>(+84) {data?.address.phone_number}</span>
            </div>
            <div>
              <span className="font-semibold">Địa chỉ:</span>{" "}
              <span>
                {data?.address.detail_address}, {data?.address.ward},{" "}
                {data?.address.district}, {data?.address.city}
              </span>
            </div>
          </div>
        </Card>
        <Card className="col-span-1 !bg-gray-100 p-6">
          <h2 className="text-[2rem] font-bold">2. Thông tin đơn hàng</h2>
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-semibold">Phương thức thanh toán:</span>{" "}
              <span>
                {data?.payment_method === 0 ? "Thanh toán khi nhận hàng" : ""}
                {data?.payment_method === 1 ? "Thanh toán bằng VNPAY" : ""}
              </span>
            </div>
            <div>
              <span className="font-semibold">Trạng thái thanh toán:</span>{" "}
              <span>{paymentMethods(data?.payment_status)}</span>
            </div>
            <div>
              <span className="font-semibold">Ngày mua hàng:</span>{" "}
              <span>{formatDate(data?.created_at)}</span>
            </div>
            <div>
              <span className="font-semibold">Trạng thái:</span>{" "}
              <span
                className={`${getOrderStatus(data?.order_status).className} rounded px-2 py-1`}
              >
                {getOrderStatus(data?.order_status).label}
              </span>
            </div>

            {/* Cập nhật đơn hàng */}
            <Button
              variant="contained"
              disabled={
                data?.order_status === "cancelled" ||
                data?.order_status === "delivered" ||
                data?.order_status === "shipping" ||
                data?.order_status === "completed" ||
                data?.order_status === "received"
              }
              onClick={() =>
                openPopup(
                  <Confirm
                    titleButton={"Xác nhận"}
                    handleDelete={() => handleUpdateStatus()}
                  />,
                )
              }
            >
              {statusUpdate(data?.order_status)}
            </Button>

            {/* Hủy đơn hàng */}
            <>
              {/* <Button
                variant="outlined"
                color="error"
                onClick={handleOpenDialog}
                disabled={
                  data?.order_status === "cancelled" ||
                  data?.order_status === "delivered" ||
                  data?.order_status === "shipping" ||
                  data?.order_status === "completed" ||
                  data?.order_status === "received"
                }
              >
                Hủy đơn hàng
              </Button> */}
              <Dialog open={open} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>Nhập lý do hủy đơn hàng</DialogTitle>
                <DialogContent>
                  <TextareaAutosize
                    autoFocus
                    minRows={3}
                    placeholder="Lý do hủy"
                    style={{
                      width: "100%",
                      padding: "8px",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      outline: "none",
                    }}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Hủy
                  </Button>
                  <Button
                    onClick={handleConfirmCancel}
                    color="error"
                    disabled={!reason}
                  >
                    Xác nhận hủy
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          </div>
        </Card>
      </div>
      {/* Khối chi tiết đơn hàng */}
      <div className="mt-16 overflow-hidden">
        <h2 className="text-[2rem] font-bold">4. Chi tiết đơn hàng</h2>


        {/* Bọc bảng trong một container có overflow-x-auto */}
        <div className="mt-4 overflow-x-auto rounded-md ">
          <table className="min-w-full max-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-gray-400 p-2 text-left">STT</th>
                <th className="border border-gray-400 p-2 text-left">Ảnh</th>
                <th className="border border-gray-400 p-2 text-left">
                  Tên sản phẩm
                </th>
                <th className="border border-gray-400 p-2 text-center">Giá</th>
                <th className="border border-gray-400 p-2 text-center">
                  Số lượng
                </th>
                <th className="border border-gray-400 p-2 text-center">Size</th>
                <th className="border border-gray-400 p-2 text-center">Màu</th>
                <th className="border border-gray-400 p-2 text-center">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody className="">
              {data?.order_items.map((item, index) => (
                <tr className={`bg-white`} key={item.order_id}>
                  <td className="border border-gray-400 p-2">{index + 1}</td>
                  <td className="border border-gray-400 p-2">
                    <img
                      src={item.product.img_thumbnail}
                      alt="Sản phẩm 1"
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-400 w-[740px] p-2">
                    <div className="flex flex-col">
                      {item.product.name}
                      {item.status_deleted !== 0 && (
                        <Chip
                          label="Hết hàng"
                          color="error"
                          size="small"
                          sx={{ width: "80px" }}
                        />
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-400 p-2 text-center text-[#ee4d2d]">
                    {formatCurrency(item.price ?? 0)}
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-400 p-2 text-center text-[#ee4d2d]">
                    {item.size}
                  </td>
                  <td className="border border-gray-400 p-2 flex items-center justify-center">
                    <div
                      className=""
                      style={{
                        backgroundColor: item.color,
                        height: "15px",
                        width: "15px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    ></div>
                  </td>
                  <td className="border border-gray-400 p-2 text-center text-[#ee4d2d]">
                    {formatCurrency(
                      (Number(item.price) || 0) * (Number(item.quantity) || 0),
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
      <div className="flex justify-between  mt-6">
        <div>
          <label className="block mb-2 font-medium text-gray-900">Ghi chú:</label>
          <textarea
            id="message"
            className="block p-2.5 w-[500px] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Không có ghi chú"
            value={data?.note || ""} // Gắn giá trị từ props
            readOnly // Chỉ cho phép đọc
          />
        </div>
        <div className=" ">
          <div className="flex justify-between items-center">
            <span className="mr-12 block mb-2 font-medium text-gray-900 ">Phiếu giảm giá:</span>
            <span className="font-bold text-[#ee4d2d] text-right mr-4 min-w-[100px]">
              -{formatCurrency(Number(data?.voucher_discount))}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="block mb-2 font-medium text-gray-900">Thành tiền:</span>
            <span className="font-bold text-[#ee4d2d] text-right border border-gray-400 py-2 px-4 min-w-[100px]">
              {formatCurrency(data?.total_amount ?? 0)}
            </span>
          </div>
        </div>
      </div>
    </div >

  );
};

export default OrderDetailAdmin;
