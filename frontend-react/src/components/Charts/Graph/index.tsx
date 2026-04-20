// Graph.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface DataPoint {
  x: number; // Or `Date` if using actual datetime objects.
  y: number;
}

interface Series {
  name: string;
  data: DataPoint[];
}

interface Props {
  data: Series[];
}

export const Graph: React.FC<Props> = ({ data }) => {
  const options = {
    chart: {
      type: 'area',
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Profits and Losses Over Time',
      align: 'left',
      style: {
        fontSize: '14px',
      },
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tickAmount: 4,
      floating: false,
      labels: {
        style: {
          colors: '#8e8da4',
        },
        offsetY: -7,
        offsetX: 0,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 0.5,
    },
    tooltip: {
      x: {
        format: 'yyyy',
      },
      fixed: {
        enabled: false,
        position: 'topRight',
      },
    },
    grid: {
      yaxis: {
        lines: {
          offsetX: -30,
        },
      },
      padding: {
        left: 20,
      },
    },
  };

  return <ReactApexChart options={options as any} series={data} type="area" height={350} />;
};

export default Graph;
