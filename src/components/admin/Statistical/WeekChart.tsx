/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

interface RevenueChartProps {
  data: {
    total_revenue_default: { time: string; price: number }[];
    total_revenue: number;
  };
}

const WeekChart: React.FC<RevenueChartProps> = ({ data }) => {
  // Dữ liệu cho biểu đồ
  const chartData = {
    labels: data.total_revenue_default.map((item) => item.time), // Labels là thời gian
    datasets: [
      {
        label: "Doanh thu",
        data: data.total_revenue_default.map((item) => item.price), // Dữ liệu là giá trị price
        fill: false,
        borderColor: "rgb(75, 192, 192)", // Màu của đường line
        tension: 0.1,
      },
    ],
  };

  // Các tùy chọn cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Biểu đồ doanh thu",
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.raw.toLocaleString()}`, // Hiển thị tooltip với định dạng số
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
      <div className="total-revenue">
        <p>Tổng doanh thu: {data.total_revenue.toLocaleString()}₫</p>
      </div>
    </div>
  );
};

export default WeekChart;
