/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Chip, Tab } from "@mui/material";
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
                <section
                  className={`${order_item.status_deleted !== 0 ? "pointer-events-none opacity-50" : ""}`}
                >
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
                      <div className="flex items-center gap-[10px]">
                        <p className="text-slate-500">
                          Phân loại hàng: {order_item.size}
                        </p>
                        Màu:
                        <p
                          style={{
                            backgroundColor: order_item.color,
                            height: "15px",
                            width: "15px",
                            borderRadius: "5px",
                          }}
                        ></p>
                      </div>
                      <p className="flex items-center gap-[10px] font-medium text-black">
                        x{order_item.quantity}
                        {order_item.status_deleted === 1 && (
                          <Chip label="Hết hàng" color="error" size="small" />
                        )}
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
