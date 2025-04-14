import {FC} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { colors } from "../../../constants/colors";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type TotalChartProps = {
	data: {
		labels: string[];
		datasets: {
				label: string;
				data: number[];
				value: string;
				backgroundColor: string;
		}[]
	},
	isLoading?: boolean;
	onClick?: (event: any, elements: { datasetIndex: number }[]) => void;
}

const TotalChart : FC<TotalChartProps> = ({data, onClick, isLoading}) => {
	const options = {
		indexAxis: "y" as const, 
		responsive: true,
		onClick: onClick,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					boxWidth: 20,
					boxHeight: 20,
					padding: 20,
					pointStyle: "circle",
					usePointStyle: true,
					color: colors.black,

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
					color: colors.lightgrey
				},
			},
			y: {
				stacked: true,
			},
		},
	};
	
	return <Bar 
		width={300} 
		height={30} 
		style={{width: 300, height: 30, opacity: isLoading ? 0.7 : 1, transition: "opacity 0.2s"}} 
		data={data} 
		options={options} />;
};

export default TotalChart;
