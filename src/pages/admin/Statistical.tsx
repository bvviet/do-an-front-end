import React, { useState } from "react";
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

const orders = [
  {
    id: 1,
    customerName: "Quần bò rách",
    orderDate: "2024-10-30T14:00:00Z",
    value: 150000,
  },
  {
    id: 2,
    customerName: "Áo gucci",
    orderDate: "2024-10-29T09:30:00Z",
    value: 200000,
  },
  {
    id: 3,
    customerName: "Quần jean nam streetwear",
    orderDate: "2024-10-31T12:15:00Z",
    value: 100000,
  },
  {
    id: 4,
    customerName: "Áo Phông Nam Nữ Dio",
    orderDate: "2024-10-28T16:45:00Z",
    value: 250000,
  },
  {
    id: 5,
    customerName: "Áo sơ mi nam tay dài JBAGY Pastel",
    orderDate: "2024-10-27T11:00:00Z",
    value: 300000,
  },
];

const userData = [
  { name: "Khách hàng 1", amount: 1200 },
  { name: "Khách hàng 2", amount: 950 },
  { name: "Khách hàng 3", amount: 770 },
];

const productData = [
  { name: "Áo Phông Nam Nữ Dio", amount: 1200 },
  { name: "Áo sơ mi nam tay dài JBAGY Pastel", amount: 950 },
  { name: "Áo gucci", amount: 770 },
];

const revenueData = [
  { month: "Tháng 1", total: 1500000 },
  { month: "Tháng 2", total: 2000000 },
  { month: "Tháng 3", total: 2500000 },
  { month: "Tháng 4", total: 3000000 },
  { month: "Tháng 5", total: 3500000 },
];

const Statistical: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);

  // Format start_date và end_date
  const start_date = dateRange[0]
    ? dayjs(dateRange[0]).format("YYYY-MM-DD HH:mm:ss")
    : "";
  const end_date = dateRange[1]
    ? dayjs(dateRange[1]).format("YYYY-MM-DD HH:mm:ss")
    : "";

  const handleDateFilter = (range: DateRange<Dayjs>) => {
    setDateRange(range);
    // Thêm logic xử lý dữ liệu dựa trên ngày đã chọn ở đây
  };

  const [value, setValue] = React.useState("total");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <DateFilter onFilter={handleDateFilter} />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Tổng doanh thu" value="total" />
          <Tab label="3 khách hàng mua nhiều nhất" value="users" />
          <Tab label="3 sản phẩm bán chạy nhất" value="products" />
          <Tab label="5 đơn hàng mới nhất" value="orders" />
        </TabList>
        {value === "total" && <RevenueStatistical revenueData={revenueData} />}
        {value === "users" && <UsersStatistical data={userData} />}
        {value === "orders" && <OrdersStatistical orders={orders} topN={5} />}
        {value === "products" && <ProductsStatistical data={productData} />}
      </TabContext>
      <p>
        Thống kê từ ngày: {start_date} đến {end_date}
      </p>
    </div>
  );
};

export default Statistical;
