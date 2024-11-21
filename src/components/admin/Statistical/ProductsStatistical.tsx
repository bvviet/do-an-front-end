import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface UserSpending {
  name: string;
  total_quantity: string;
  total_revenue: string;
}

interface BarChartProps {
  data?: UserSpending[];
}

const ProductsStatistical: React.FC<BarChartProps> = ({ data }) => {
  const options: Highcharts.Options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Top 5 sản phẩm bán chạy nhất",
      style: {
        fontSize: "24px",
      },
    },
    xAxis: {
      categories: (data || []).map((user) => user.name),
      title: {
        text: "Sản phẩm",
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
        text: "Số lượng ",
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
      valuePrefix: "",
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
        name: "Tổng số lượng",
        type: "bar",
        data: (data || []).map((user) => Number(user.total_quantity)),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ProductsStatistical;
