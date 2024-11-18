import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface UserSpending {
  name: string;
  total_spent: string;
}

interface BarChartProps {
  data: UserSpending[];
}

const UsersStatistical: React.FC<BarChartProps> = ({ data }) => {
  const options: Highcharts.Options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Top 3 khách hàng mua hàng nhiều nhất",
      style: {
        fontSize: "24px",
      },
    },
    xAxis: {
      categories: data
        .map((user) => user?.name?.split(" ").pop())
        .filter((name) => name !== undefined),
      title: {
        text: "Khách hàng",
        style: {
          fontSize: "16px",
        },
      },
      labels: {
        style: {
          fontSize: "16px",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Số tiền (VNĐ)",
        align: "high",
        style: {
          fontSize: "18px",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
        },
        formatter: function () {
          return `${this.value?.toLocaleString("vi-VN")} đ`;
        },
      },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b>: ${this.y?.toLocaleString("vi-VN")} đ`;
      },
      style: {
        fontSize: "14px",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return `${this.y?.toLocaleString("vi-VN")} đ`;
          },
          style: {
            fontSize: "14px",
          },
        },
      },
    },
    series: [
      {
        name: "Tổng số tiền",
        type: "bar",
        data: data.map((user) => parseFloat(user?.total_spent)),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default UsersStatistical;
