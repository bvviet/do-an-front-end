import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface RevenueStatisticalProps {
  revenueData: {
    total_revenue: string | undefined;
    start_date: string | undefined;
    end_date: string | undefined;
  };
}

const RevenueStatistical: FC<RevenueStatisticalProps> = ({ revenueData }) => {
  // Chuyển đổi doanh thu từ chuỗi sang số
  const totalRevenue = parseInt(
    revenueData?.total_revenue?.replace("đ", "").replace(/,/g, "") || "0",
    10,
  );

  // Định dạng doanh thu kiểu tiền Việt với dấu chấm
  const formattedRevenue = totalRevenue
    .toLocaleString("vi-VN") // Tự động thêm dấu chấm
    .concat(" đ"); // Thêm chữ "đ" ở cuối

  // Cấu hình dữ liệu biểu đồ
  const chartData = {
    labels: [`Tổng doanh thu`], // Chỉ có 1 cột
    datasets: [
      {
        label: `Tổng doanh thu (${formattedRevenue})`,
        data: [totalRevenue], // Doanh thu
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Tùy chỉnh biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `Tổng doanh thu từ ${revenueData?.start_date} đến ${revenueData?.end_date}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Doanh thu (VNĐ)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Khoảng thời gian",
        },
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueStatistical;
