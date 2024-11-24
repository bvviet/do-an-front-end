import React, { useEffect, useState } from "react";
import DateFilter from "@/components/admin/Statistical/DateFilter";
import UsersStatistical from "@/components/admin/Statistical/UsersStatistical";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { Dayjs } from "dayjs";
import dayjs from "dayjs"; // Import dayjs
import ProductsStatistical from "@/components/admin/Statistical/ProductsStatistical";
import OrdersStatistical from "@/components/admin/Statistical/OrdersStatistical";
import TabList from "@mui/lab/TabList";
import { Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import RevenueStatistical from "@/components/admin/Statistical/RevenueStatistical";
import {
  useGetStatisticalOrdersQuery,
  useGetStatisticalProductsQuery,
  useGetStatisticalTimeQuery,
  useGetStatisticalUsersQuery,
  useWeekStatisticalQuery,
} from "@/services/productApi";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import WeekChart from "@/components/admin/Statistical/WeekChart";

const Statistical: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
  const dispatch = useDispatch();
  // Format start_date và end_date
  const start_date = dateRange[0]
    ? dayjs(dateRange[0]).format("DD-MM-YYYY")
    : "";
  const end_date = dateRange[1] ? dayjs(dateRange[1]).format("DD-MM-YYYY") : "";

  const handleDateFilter = (range: DateRange<Dayjs>) => {
    setDateRange(range);
    // Thêm logic xử lý dữ liệu dựa trên ngày đã chọn ở đây
  };

  const [value, setValue] = React.useState("total");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Tính ngày mặc định là tháng trước
  const defaultStartDate = dayjs()
    .subtract(1, "month")
    .startOf("month")
    .format("YYYY-MM-DD");
  const defaultEndDate = dayjs().format("YYYY-MM-DD");

  // Nếu không có start_date hoặc end_date từ người dùng, sử dụng giá trị mặc định
  const { data: timeData, isLoading: isLoadingTime } =
    useGetStatisticalTimeQuery({
      start_date: start_date || defaultStartDate,
      end_date: end_date || defaultEndDate,
    });

  const { data: userData, isLoading: isLoadingUsers } =
    useGetStatisticalUsersQuery({
      start_date: start_date || defaultStartDate,
      end_date: end_date || defaultEndDate,
    });

  const { data: productsData, isLoading: isLoadingProducts } =
    useGetStatisticalProductsQuery({
      start_date: start_date || defaultStartDate,
      end_date: end_date || defaultEndDate,
    });

  const { data: ordersData, isLoading: isLoadingOrders } =
    useGetStatisticalOrdersQuery({
      start_date: start_date || defaultStartDate,
      end_date: end_date || defaultEndDate,
    });

  const { data: revenueData, isLoading: isLoadingWeek } =
    useWeekStatisticalQuery(undefined);

  useEffect(() => {
    dispatch(
      setLoading(
        isLoadingTime ||
          isLoadingUsers ||
          isLoadingProducts ||
          isLoadingOrders ||
          isLoadingWeek,
      ),
    );
  }, [
    dispatch,
    isLoadingTime,
    isLoadingUsers,
    isLoadingProducts,
    isLoadingOrders,
    isLoadingWeek,
  ]);

  return (
    <div>
      <DateFilter onFilter={handleDateFilter} />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Tổng doanh thu" value="total" />
          <Tab label="5 khách hàng mua nhiều nhất" value="users" />
          <Tab label="5 sản phẩm bán chạy nhất" value="products" />
          <Tab label="5 đơn hàng mới nhất" value="orders" />
          <Tab label="Doanh thu tuần qua" value="week" />
        </TabList>
        {value === "total" && <RevenueStatistical revenueData={timeData} />}
        {value === "users" && (
          <UsersStatistical data={userData?.top_customers || []} />
        )}

        {value === "orders" && <OrdersStatistical orders={ordersData || []} />}

        {value === "products" && <ProductsStatistical data={productsData} />}
        {value === "week" && <WeekChart data={revenueData} />}
      </TabContext>
      {value !== "week" && (
        <p>
          Thống kê từ ngày: {start_date ? start_date : defaultStartDate} đến{" "}
          {end_date ? end_date : defaultEndDate}
        </p>
      )}
    </div>
  );
};

export default Statistical;
