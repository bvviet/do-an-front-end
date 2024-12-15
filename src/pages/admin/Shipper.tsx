import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  useCancelOrderShippingMutation,
  useConfirmDeliveryMutation,
  useGetOrdersByStatusShippingQuery,
} from "@/services/productApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useDateFormatter from "@/hooks/useDateFormatter";
import { formatCurrency } from "@/utils/formatCurrency";

const Shipper: React.FC = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const dispatch = useDispatch();
  const { formatDate } = useDateFormatter();

  const {
    data: ordersShipping,
    error,
    isLoading,
    refetch,
  } = useGetOrdersByStatusShippingQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [confirmDelivery, { isLoading: isLoadingConfirm }] =
    useConfirmDeliveryMutation();

  const handleOpenConfirmDialog = (orderId: number) => {
    setSelectedOrder(orderId);
    setOpenConfirm(true);
  };

  const handleOpenCancelDialog = (orderId: number) => {
    setSelectedOrder(orderId);
    setOpenCancel(true);
  };

  const handleCloseDialogs = () => {
    setOpenConfirm(false);
    setOpenCancel(false);
    setCancelReason("");
    setSelectedOrder(null);
  };

  const handleConfirmDelivery = async () => {
    if (selectedOrder) {
      try {
        await confirmDelivery({ orderId: selectedOrder }).unwrap();
        refetch();
        toast.success("Đơn hàng đã được xác nhận đã giao hàng.");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Lỗi xác nhận đơn hàng.");
      }
    }
    handleCloseDialogs();
  };
  const [canCellShipping, { isLoading: isLoadingCanCell }] =
    useCancelOrderShippingMutation();
  const handleCancelDelivery = async () => {
    try {
      const res = await canCellShipping({
        orderId: selectedOrder,
        note: cancelReason,
      }).unwrap();
      toast.success(res.message);
      refetch();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast.error("Trạng thái đơn hàng hiện tại không cho phép cập nhật.");
    }
    handleCloseDialogs();
  };

  useEffect(() => {
    dispatch(setLoading(isLoading || isLoadingCanCell || isLoadingConfirm));
  }, [isLoading, isLoadingCanCell, isLoadingConfirm, refetch, dispatch]);

  // Kiểm tra xem API có trả về thông điệp "Không có đơn hàng nào cần giao" hay không
  const isNoOrdersMessage =
    error && "status" in error && (error as FetchBaseQueryError).status === 404;

  // Xác định danh sách đơn hàng
  const ordersShippingFinal = isNoOrdersMessage
    ? []
    : ordersShipping?.orders || [];

  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h5" gutterBottom>
          Danh sách đơn hàng đang vận chuyển
        </Typography>
        {ordersShippingFinal.length > 0 ? (
          ordersShippingFinal.map((order) => (
            <Card key={order.order_id} sx={{ mb: 3, boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ p: 2, backgroundColor: "#f0f4f8", borderRadius: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Mã đơn hàng: {order.order_id}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Khách hàng:{" "}
                    <span style={{ color: "#333" }}>{order.customer_name}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Số điện thoại:{" "}
                    <span style={{ color: "#333" }}>{order.customer_name}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Phương thức thanh toán:
                    <span style={{ color: "#333" }}>
                      {order?.payment_method === 0
                        ? "Thanh toán khi nhận hàng"
                        : ""}
                      {order?.payment_method === 1
                        ? "Thanh toán bằng VNPAY"
                        : ""}
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Địa chỉ:{" "}
                    <span style={{ color: "#333" }}>{order.address}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Thời giao hàng:{" "}
                    <span style={{ color: "#333" }}>
                      {formatDate(order.delivery_time)}
                    </span>
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  mt={2}
                  fontWeight="bold"
                  gutterBottom
                >
                  Sản phẩm:
                </Typography>
                {order.products.map((product, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      py: 1,
                      borderBottom: "1px solid #e0e0e0",
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        product.image === "N/A"
                          ? "https://placehold.co/276x350?text=H%E1%BA%BFt%20h%C3%A0ng"
                          : product.image
                      }
                      alt={product.product_name}
                      sx={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: 1,
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {product.product_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Số lượng: {product.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Giá:{" "}
                        <span className="text-[#ee4d2d]">
                          {formatCurrency(product.price)}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
                  Số tiền phải thu:{" "}
                  {order?.payment_method !== 0 ? (
                    <span className="text-[#ee4d2d]">0đ</span>
                  ) : (
                    <span className="text-[#ee4d2d]">
                      {formatCurrency(order.total_amount)}
                    </span>
                  )}
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOpenConfirmDialog(order.order_id)}
                    startIcon={<CheckCircleIcon />}
                    disabled={order.order_status === "delivered"}
                    sx={{ width: "45%", fontSize: "1.3rem" }}
                  >
                    {order.order_status === "delivered"
                      ? "Đã giao"
                      : "Xác nhận đã giao"}
                  </Button>
                  {order?.payment_method !== 0 ? (
                    ""
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenCancelDialog(order.order_id)}
                      startIcon={<CancelIcon />}
                      disabled={order.order_status === "delivered"}
                      sx={{ width: "45%", fontSize: "1.3rem" }}
                    >
                      {order.order_status === "canceled"
                        ? "Đã hủy"
                        : "Hủy giao"}
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            Không có đơn hàng nào cần giao.
          </Typography>
        )}

        {/* Dialog Xác nhận giao hàng */}
        <Dialog open={openConfirm} onClose={handleCloseDialogs}>
          <DialogTitle>Xác nhận giao hàng</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn đã giao đơn hàng này cho khách hàng?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogs} color="primary">
              Hủy
            </Button>
            <Button onClick={handleConfirmDelivery} color="success" autoFocus>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Hủy giao hàng */}
        <Dialog open={openCancel} onClose={handleCloseDialogs} fullWidth>
          <DialogTitle>Hủy giao hàng</DialogTitle>
          <DialogContent>
            <DialogContentText>Nhập lý do hủy đơn hàng này:</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Lý do hủy"
              fullWidth
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogs} color="primary">
              Đóng
            </Button>
            <Button
              onClick={handleCancelDelivery}
              color="error"
              autoFocus
              disabled={!cancelReason.trim()}
            >
              Hủy giao
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Shipper;
