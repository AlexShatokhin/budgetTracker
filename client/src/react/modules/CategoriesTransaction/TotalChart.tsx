import {FC} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const options = {
  indexAxis: "y" as const, 
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        boxWidth: 20,
        boxHeight: 20,
        padding: 20,
        pointStyle: "circle",
        usePointStyle: true,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems: any) => tooltipItems[0].dataset.label,
        afterTitle: (tooltipItems: any) => tooltipItems[0].dataset.data[0] + "%",
        label: (tooltipItem: any) => tooltipItem.dataset.value + "$",
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      max: 100,
      grid: {
        display: false,
      },
      ticks: {
        callback: (value: any) => `${value}%`, // Подписи оси X в процентах
      },
    },
    y: {
      stacked: true,
    },
  },
};

type TotalChartProps = {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            value: string;
            backgroundColor: string;
        }[]
    }
}

const TotalChart : FC<TotalChartProps> = ({data}) => {
    console.log(data);
  return <Bar 
    width={300} 
    height={30} 
    style={{width: 300, height: 30}} 
    data={data} 
    options={options} />;
};

export default TotalChart;
