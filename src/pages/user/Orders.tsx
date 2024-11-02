import { Box, Button, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetOrdersUserQuery } from "@/services/productApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setLoading } from "@/redux/slices/loadingSlice";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import useDateFormatter from "@/hooks/useDateFormatter";
const status = [
  {
    id: "all",
    label: "Tất cả",
  },
  {
    id: "pending",
    label: "Chờ xác nhận",
  },
  {
    id: "shipping",
    label: "Đang vận chuyển",
  },
  {
    id: "delivered",
    label: "Đã giao hàng",
  },
  {
    id: "cancelled",
    label: "Đã hủy",
  },
];
const Orders = () => {
  const [value, setValue] = useState("all");
  const dispatch = useDispatch();
  const { data, isLoading } = useGetOrdersUserQuery(value, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);
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
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { formatDate } = useDateFormatter();
  return (
    <div className="container">
      {/* Table */}
      <div className="mb-[100px]">
        <h2 className="mb-4 text-2xl font-bold">Danh sách đơn hàng</h2>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {status.map((tus) => (
                <Tab label={tus.label} value={tus.id} />
              ))}
            </TabList>
          </Box>
        </TabContext>
        <table className="min-w-full rounded-md border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b px-4 py-2 text-center">STT</th>
              <th className="border-b px-4 py-2 text-center">Ngày mua hàng</th>
              <th className="border-b px-4 py-2 text-center">Trạng thái</th>
              <th className="border-b px-4 py-2 text-center">Giá</th>
              <th className="border-b px-4 py-2 text-center">Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders
              ? (data?.orders || []).map((order, index) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">
                      {formatDate(order?.created_at ?? undefined)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {getOrderStatus(order?.order_status)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className="font-medium text-[#ee4d2d]">
                        ₫{parseFloat(order.total_amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <Link to={`/order/detail/${order.id}`}>
                        <Button variant="outlined">Xem chi tiết</Button>
                      </Link>
                    </td>
                  </tr>
                ))
              : "Không có đơn nào"}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Orders;
