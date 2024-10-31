import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface UserSpending {
  name: string;
  amount: number;
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
      text: "Top 3 khác hàng mua hàng nhiều nhất",
      style: {
        fontSize: "24px",
      },
    },
    xAxis: {
      categories: data.map((user) => user.name),
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
        text: "Số tiền (vnđ)",
        align: "high",
        style: {
          fontSize: "18px",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },
    tooltip: {
      valuePrefix: "$",
      style: {
        fontSize: "14px",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
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
        data: data.map((user) => user.amount),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default UsersStatistical;
