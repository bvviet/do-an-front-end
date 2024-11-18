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
} from "@/services/productApi";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

const revenueData = [
  { month: "Tháng 1", total: 1500000 },
  { month: "Tháng 2", total: 2000000 },
  { month: "Tháng 3", total: 2500000 },
  { month: "Tháng 4", total: 3000000 },
  { month: "Tháng 5", total: 3500000 },
];

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
  console.log({ timeData });

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
  useEffect(() => {
    if (
      isLoadingTime ||
      isLoadingUsers ||
      isLoadingProducts ||
      isLoadingOrders
    ) {
      dispatch(
        setLoading(
          isLoadingTime ||
            isLoadingUsers ||
            isLoadingProducts ||
            isLoadingOrders,
        ),
      );
    }
  }, [
    dispatch,
    isLoadingTime,
    isLoadingUsers,
    isLoadingProducts,
    isLoadingOrders,
  ]);
  console.log({
    isLoadingTime,
    isLoadingUsers,
    isLoadingProducts,
    isLoadingOrders,
  });

  return (
    <div>
      <DateFilter onFilter={handleDateFilter} />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Tổng doanh thu" value="total" />
          <Tab label="3 khách hàng mua nhiều nhất" value="users" />
          <Tab label="5 sản phẩm bán chạy nhất" value="products" />
          <Tab label="5 đơn hàng mới nhất" value="orders" />
        </TabList>
        {value === "total" && <RevenueStatistical revenueData={timeData} />}
        {value === "users" && (
          <UsersStatistical data={userData?.top_customers || []} />
        )}

        {value === "orders" && <OrdersStatistical orders={ordersData || []} />}

        {value === "products" && (
          <ProductsStatistical data={productsData || []} />
        )}
      </TabContext>
      <p>
        Thống kê từ ngày: {start_date} đến {end_date}
      </p>
    </div>
  );
};

export default Statistical;
