// RealTimeChart.tsx
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

type DataPoint = [number, number];

export const SalesChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const XAXISRANGE = 10000; // Adjust the range as needed.
  let lastDate = Date.now(); // Track the last data point's timestamp.

  const getNewSeries = (lastDate: number, { min, max }: { min: number; max: number }) => {
    const newTimestamp = lastDate + 1000; // New data every second.
    const newValue = Math.floor(Math.random() * (max - min + 1)) + min; // Random value for now.
    return [newTimestamp, newValue];
  };

  useEffect(() => {
    // Update data every second.
    const interval = setInterval(() => {
      const newData = getNewSeries(lastDate, { min: 10, max: 90 });
      lastDate = newData[0];

      setData((prevData) => [...prevData, newData] as DataPoint[]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      colors: ["#b4a9d1"], 
      width: 2, 
    },
    title: {
      text: 'Sales Over time',
      align: 'left',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      range: XAXISRANGE,
    },
    yaxis: {
      max: 100,
    },
    legend: {
      show: false,
    },
  };

  const series = [{
    data: data.slice(),
  }];

  return (
    <div id="chart">
      <Chart options={options as any} series={series as any[]} type="line" height="350" />
    </div>
  );
};

export default SalesChart;
