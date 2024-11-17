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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

interface Order {
  id: number;
  order_code: string;
  total_amount: string;
  created_at: string;
}

interface OrdersStatisticalProps {
  orders: Order[]; // orders là một mảng kiểu Order
}

const OrdersStatistical: React.FC<OrdersStatisticalProps> = ({ orders }) => {
  console.log({ orders });

  const chartData = {
    labels: orders.map(
      (order) => `${order.order_code} - (${order.created_at})`,
    ),
    datasets: [
      {
        label: "Giá trị đơn hàng (vnđ)",
        data: orders.map((order) => {
          const amountWithoutDot = order.total_amount
            .replace("đ", "")
            .split(".")
            .join("");
          return parseFloat(amountWithoutDot);
        }),
        backgroundColor: "rgb(90, 173, 224)",
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
