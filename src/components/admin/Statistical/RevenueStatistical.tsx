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

// Đăng ký các thành phần cần thiết cho biểu đồ
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

interface RevenueChartProps {
  revenueData: { month: string; total: number }[]; // Dữ liệu doanh thu
}

const RevenueStatistical: React.FC<RevenueChartProps> = ({ revenueData }) => {
  const chartData = {
    labels: revenueData.map((data) => data.month), // Tháng hoặc tuần
    datasets: [
      {
        label: "Tổng Doanh Thu",
        data: revenueData.map((data) => data.total), // Giá trị doanh thu
        backgroundColor: "rgba(86, 72, 185, 0.5)", // Màu sắc cho cột
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

export default RevenueStatistical;
