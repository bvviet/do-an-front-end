import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  value: number; // Giá trị đơn hàng
}

interface TopOrdersBarChartProps {
  orders: Order[];
  topN: number; // Số lượng đơn hàng muốn hiển thị
}

const OrdersStatistical: React.FC<TopOrdersBarChartProps> = ({ orders, topN }) => {
  // Sắp xếp đơn hàng và lấy topN
  const topOrders = orders
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, topN);

  const chartData = {
    labels: topOrders.map(order => order.customerName),
    datasets: [
      {
        label: "Giá trị đơn hàng (vnđ)",
        data: topOrders.map(order => order.value),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default OrdersStatistical;