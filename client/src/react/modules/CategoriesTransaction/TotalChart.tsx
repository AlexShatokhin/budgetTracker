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
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => tooltipItem.dataset.value + "$", // Отображение в процентах
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
  return <Bar width={300} height={30} style={{width: 300, height: 30}} data={data} options={options} />;
};

export default TotalChart;
