import WeekChart from "@/components/admin/Statistical/WeekChart";
import { setLoading } from "@/redux/slices/loadingSlice";
import {
  useGetOrdersAdminQuery,
  useWeekStatisticalQuery,
} from "@/services/productApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDate } from "date-fns";
import { Avatar } from "@mui/material";
import { formatCurrency } from "@/utils/formatCurrency";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: revenueData, isLoading: isLoadingWeek } =
    useWeekStatisticalQuery(undefined);

  const { data: ordersStatus, isLoading: isLoadingGetStatus } =
    useGetOrdersAdminQuery();

  useEffect(() => {
    dispatch(setLoading(isLoadingWeek || isLoadingGetStatus));
  }, [dispatch, isLoadingWeek, isLoadingGetStatus]);

  const ordersNew = (ordersStatus?.orders || []).slice(-5).reverse();
  console.log({ ordersNew });

  return (
    <div className="mt-14 grid grid-cols-12 gap-8">
      <div className="col-span-8 rounded-xl bg-slate-50 p-5">
        <WeekChart data={revenueData} />
      </div>
      <div className="col-span-4 rounded-xl bg-slate-50 p-5">
        <h2 className="mb-8 text-[1.8rem] font-bold">Hoạt động gần đây 🔔</h2>
        <div className="flex flex-col gap-4">
          {ordersNew?.map((order) => (
            <div key={order.id}>
              <div className="my-5 flex items-center gap-3">
                <Link to={"#"} className="">
                  <Avatar src={order.user.avatar ?? ""}>
                    {order.user.name.slice(0, 1).toLocaleUpperCase()}
                  </Avatar>
                </Link>
                <div className="text-[#7D8087]">
                  <Link to={`/admin/order/detail/${order.id}`}>
                    Khách hàng{" "}
                    <span className="text-black">{order.user.name}</span> đã mua{" "}
                    <span className="text-black">
                      {order.order_items.length}
                    </span>{" "}
                    sản phẩm{" "}
                  </Link>
                  <div className="flex items-center justify-between">
                    <p>
                      <AccessTimeIcon fontSize="small" />{" "}
                      {formatDate(order.created_at, "dd/MM/yyyy HH:mm:ss")}
                    </p>
                    <p className="text-[#ee4d2d]">
                      {formatCurrency(order.total_amount)}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
