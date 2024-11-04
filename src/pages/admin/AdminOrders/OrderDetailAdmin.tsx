import Confirm from "@/components/Confirm";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { setLoading } from "@/redux/slices/loadingSlice";
import {
  useCancelOrderUserMutation,
  useGetDetailOrderAdminQuery,
  useUpdateOrderStatusAdminMutation,
} from "@/services/productApi";
import { getOrderStatus } from "@/utils/getOrderStatus";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
          status: "shipped",
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
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 bg-gray-200">
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
              <span>{data?.address.phone_number}</span>
            </div>
            <div>
              <span className="font-semibold">Địa chỉ:</span>{" "}
              <span>
                {data?.address.detail_address}, {data?.address.ward},{" "}
                {data?.address.district}, {data?.address.city}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-gray-200">
          <h2 className="text-[2rem] font-bold">2. Thông tin đơn hàng</h2>
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-semibold">Mã đơn hàng:</span>{" "}
              <span>{data?.order_id}</span>
            </div>
            <div>
              <span className="font-semibold">Phương thức:</span>{" "}
              <span>{data?.payment_status}</span>
            </div>
            <div>
              <span className="font-semibold">Ngày mua hàng:</span>{" "}
              <span>{data?.created_at}</span>
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
                data?.order_status === "shipped" ||
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
              <Button
                variant="outlined"
                color="error"
                onClick={handleOpenDialog}
                disabled={
                  data?.order_status === "cancelled" ||
                  data?.order_status === "delivered" ||
                  data?.order_status === "shipped" ||
                  data?.order_status === "completed" ||
                  data?.order_status === "received"
                }
              >
                Hủy đơn hàng
              </Button>
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
        </div>
        <div className="col-span-1 bg-gray-200">
          <h2 className="text-[2rem] font-bold">3. Thông tin giao hàng</h2>
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-semibold">Người giao:</span>{" "}
              <span>ABC</span>
            </div>
            <div>
              <span className="font-semibold">Hình thức:</span> <span>ABC</span>
            </div>
          </div>
        </div>
      </div>
      {/* Khối chi tiết đơn hàng */}
      <div className="mt-16 overflow-hidden">
        <h2 className="text-[2rem] font-bold">4. Chi tiết đơn hàng</h2>
        <div>
          <p className="font-semibold">Khách hàng ghi chú: {data?.note}</p>
        </div>
        {/* Bọc bảng trong một container có overflow-x-auto */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full max-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-gray-400 p-2 text-left">#</th>
                <th className="border border-gray-400 p-2 text-left">Ảnh</th>
                <th className="border border-gray-400 p-2 text-left">
                  Tên sản phẩm
                </th>
                <th className="border border-gray-400 p-2 text-center">Giá</th>
                <th className="border border-gray-400 p-2 text-center">
                  Số lượng
                </th>
                <th className="border border-gray-400 p-2 text-center">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.order_items.map((item, index) => (
                <tr className="bg-white" key={item.order_id}>
                  <td className="border border-gray-400 p-2">{index + 1}</td>
                  <td className="border border-gray-400 p-2">
                    <img
                      src={item.product.img_thumbnail}
                      alt="Sản phẩm 1"
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    {item.product.name}
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    {item.price}
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    {(Number(item.price) || 0) * (Number(item.quantity) || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200">
                <td
                  colSpan={4}
                  className="border border-gray-400 p-2 text-right font-bold"
                >
                  Tổng tiền:
                </td>
                <td className="border border-gray-400 p-2 text-center font-bold">
                  {data?.total_all_orders}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAdmin;
