
import React from "react";
import ReactApexChart from "react-apexcharts";

interface OrderData {
  monthYear: string;
  count: number;
}

interface Props {
  data: OrderData[];
}

export const OrderChart: React.FC<Props> = ({ data }) => {
  const categories = data.map((d) => d.monthYear);
  const seriesData = data.map((d) => d.count);

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    title: {
      text: "Monthly Orders",
      align: "left",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
        colors: {
            ranges: [
              { from: 0, to: 10, color: '#d1cae3' },
              { from: 11, to: 20, color: '#b4a9d1' },
              { from: 21, to: 50, color: '#9a7af1' },
              { from: 51, to: 100, color: '#564585'}
            ],
        }
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
  };

  const series = [
    {
      data: seriesData,
    },
  ];

  return (
    <ReactApexChart
      options={options as any}
      series={series as any[]}
      type="bar"
      height={350}
    />
  );
};

export default OrderChart;
