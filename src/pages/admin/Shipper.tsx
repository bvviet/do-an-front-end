import React, { useState } from "react";
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

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  estimatedTime: string;
  products: Product[];
  total: number;
  status: "pending" | "delivered" | "canceled";
}

const Shipper: React.FC = () => {
  // Danh sách đơn hàng mẫu
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      customerName: "Nguyễn Văn A",
      phone: "0123456789",
      address: "123 Đường ABC, Thành phố X",
      estimatedTime: "14:00 01/11/2024",
      products: [
        {
          name: "Sản phẩm 1",
          quantity: 2,
          price: 2000000,
        },
        {
          name: "Sản phẩm 2",
          quantity: 1,
          price: 1000000,
        },
      ],
      total: 5000000,
      status: "pending",
    },
    {
      id: "2",
      customerName: "Trần Thị B",
      phone: "0987654321",
      address: "456 Đường DEF, Thành phố Y",
      estimatedTime: "15:30 01/11/2024",
      products: [
        {
          name: "Sản phẩm 3",
          quantity: 1,
          price: 1500000,
        },
      ],
      total: 1500000,
      status: "pending",
    },
  ]);

  // State cho dialog xác nhận giao và hủy giao
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Mở dialog xác nhận giao
  const handleOpenConfirmDialog = (orderId: string) => {
    setSelectedOrder(orderId);
    setOpenConfirm(true);
  };

  // Mở dialog hủy giao
  const handleOpenCancelDialog = (orderId: string) => {
    setSelectedOrder(orderId);
    setOpenCancel(true);
  };

  // Đóng dialog
  const handleCloseDialogs = () => {
    setOpenConfirm(false);
    setOpenCancel(false);
    setSelectedOrder(null);
    setCancelReason("");
  };

  // Xác nhận giao hàng
  const handleConfirmDelivery = () => {
    if (selectedOrder) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder
            ? { ...order, status: "delivered" }
            : order,
        ),
      );
    }
    handleCloseDialogs();
  };

  // Hủy giao hàng
  const handleCancelDelivery = () => {
    if (selectedOrder && cancelReason.trim()) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder ? { ...order, status: "canceled" } : order,
        ),
      );
    }
    handleCloseDialogs();
  };

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h5" gutterBottom>
          Danh sách đơn hàng
        </Typography>
        {orders.map((order) => (
          <Card key={order.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">Mã đơn hàng: {order.id}</Typography>
              <Typography variant="body2">
                Khách hàng: {order.customerName}
              </Typography>
              <Typography variant="body2">
                Số điện thoại: {order.phone}
              </Typography>
              <Typography variant="body2">Địa chỉ: {order.address}</Typography>
              <Typography variant="body2">
                Thời gian dự kiến: {order.estimatedTime}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Sản phẩm:
              </Typography>
              {order.products.map((product, index) => (
                <Box key={index} sx={{ marginLeft: 2 }}>
                  <Typography variant="body2">
                    - {product.name} (x{product.quantity}) -{" "}
                    {product.price.toLocaleString()}đ
                  </Typography>
                </Box>
              ))}
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Tổng tiền: {order.total.toLocaleString()}đ
              </Typography>
              <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleOpenConfirmDialog(order.id)}
                  startIcon={<CheckCircleIcon />}
                  disabled={order.status !== "pending"}
                >
                  {order.status === "delivered"
                    ? "Đã giao"
                    : "Xác nhận đã giao"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleOpenCancelDialog(order.id)}
                  startIcon={<CancelIcon />}
                  disabled={order.status !== "pending"}
                >
                  {order.status === "canceled" ? "Đã hủy" : "Hủy giao"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}

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
        <Dialog open={openCancel} onClose={handleCloseDialogs}>
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
