/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetOrdersUserQuery } from "@/services/productApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setLoading } from "@/redux/slices/loadingSlice";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import useDateFormatter from "@/hooks/useDateFormatter";
import status from "@/utils/status";
import { formatCurrency } from "@/utils/formatCurrency";
import { getOrderStatus } from "@/utils/getOrderStatus";

const Orders = () => {
  const [value, setValue] = useState("all");
  const dispatch = useDispatch();
  const { data, isLoading } = useGetOrdersUserQuery(value, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);
  // const getOrderStatus = (status: string) => {
  //   switch (status) {
  //     case "pending":
  //       return "Chờ xác nhận";
  //     case "processing":
  //       return "Đã xác nhận";
  //     case "shipping":
  //       return "Đang vận chuyển";
  //     case "delivered":
  //       return "Đã giao hàng";
  //     case "received":
  //       return "Đã nhận";
  //     case "completed":
  //       return "Hoàn thành";
  //     case "cancelled":
  //       return "Đã hủy";
  //     case "failed":
  //       return "Giao hàng thất bại";
  //     default:
  //       return "Không xác định";
  //   }
  // };
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  console.log(data);

  const { formatDate } = useDateFormatter();
  return (
    <div className="container mt-[50px]">
      {/* Table */}
      <div className="mb-[100px]">
        <h2 className="mb-4 text-[2rem] font-bold">Danh sách đơn hàng</h2>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {status.map((tus) => (
                <Tab label={tus.label} value={tus.id} />
              ))}
            </TabList>
          </Box>
        </TabContext>
        {/* <table className="min-w-full rounded-md border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b px-4 py-2 text-center">Mã đơn</th>
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
        </table> */}

        <div className="">
          {(data?.orders || []).map((order: any) => (
            <div className="my-[15px] rounded-lg bg-white p-[24px]">
              <div className="flex items-center justify-between pb-[12px]">
                <div className="flex items-center gap-5 text-slate-500">
                  <p>{order.order_code}</p>|
                  <p>{formatDate(order.created_at)}</p>
                </div>
                <p
                  className={`font-medium ${getOrderStatus(order.order_status).className}`}
                >
                  {getOrderStatus(order.order_status).label}
                </p>
              </div>
              {/* Item */}
              {(order?.order_items || []).map((order_item: any) => (
                <section>
                  <hr />
                  <div className="flex items-center py-[12px]">
                    <Link
                      to={`/detail/${order_item.product.slug}`}
                      className="h-[80px] w-[80px]"
                    >
                      <img
                        src={`${order_item.product.img_thumbnail ? order_item.product.img_thumbnail : " https://placehold.co/276x350?text=%22No%20Image%22"}`}
                        alt=""
                        className="h-full w-full rounded-md object-cover"
                      />
                    </Link>
                    <div className="pl-[12px]">
                      <Link to={`/detail/${order_item.product.slug}`}>
                        <p className="text-[1.7rem] font-medium text-black">
                          {order_item.product.name}
                        </p>
                      </Link>
                      <p className="text-slate-500">
                        Phân loại hàng: {order_item.size}
                        {/* <div
                        className={`h-[50px] w-[50px] bg-[${order_item.color}]`}
                      >
                        a
                      </div> */}
                      </p>
                      <p className="font-medium text-black">
                        x{order_item.quantity}
                      </p>
                    </div>
                    <div className="ml-auto flex gap-[10px]">
                      <span className="text-slate-400 line-through">
                        {formatCurrency(order_item.product.price_sale)}
                      </span>
                      <span className="text-[#ee4d2d]">
                        {formatCurrency(order_item.product.price_regular)}
                      </span>
                    </div>
                  </div>
                </section>
              ))}
              <hr />
              <div className="ml-auto mt-[24px] w-fit">
                <p className="mb-[20px] ml-auto w-fit">
                  Thành tiền:{" "}
                  <span className="text-[#ee4d2d]">
                    {formatCurrency(order.total_amount)}
                  </span>
                </p>

                <Button variant="contained" color="warning">
                  Mua lại
                </Button>

                <Link to={`/order/detail/${order.id}`}>
                  <Button
                    variant="outlined"
                    color="info"
                    sx={{ marginLeft: "15px" }}
                  >
                    Xem chi tiết
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Orders;
