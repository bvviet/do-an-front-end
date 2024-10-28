import { Box, Button, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetOrdersUserQuery } from "@/services/productApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setLoading } from "@/redux/slices/loadingSlice";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

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

  const getOrderStatus = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return {
          label: "Chờ xác nhận",
          className: "text-[#BEADFA]",
        };
      case "processing":
        return { label: "Đã xác nhận", className: "bg-blue-200 text-blue-800" };
      case "shipping":
        return {
          label: "Đang vận chuyển",
          className: "text-[#61A3BA]",
        };
      case "cancelled":
        return { label: "Đã hủy", className: "text-red-500" };
      default:
        return {
          label: "Không xác định",
          className: "bg-gray-200 text-gray-800 p-3",
        };
    }
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
                      {order?.created_at}
                    </td>
                    <td
                      className={`px-4 py-2 text-center ${getOrderStatus(order.order_status).className} `}
                    >
                      {getOrderStatus(order?.order_status).label}
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
