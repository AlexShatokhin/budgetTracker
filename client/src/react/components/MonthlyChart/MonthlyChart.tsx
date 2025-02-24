import {FC} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { colors } from "../../../constants/colors";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

type MonthlyChartProps = {
    width: string;
    height: string; 
}

const MonthlyChart : FC<MonthlyChartProps> = ({width, height}) => {
    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: 'Income',
                data: [5000, 6000, 5500, 7000, 8000, 7500, 9000, 8500, 9500, 10000, 10500, 11000],
                backgroundColor: colors.blue,
            },
            {
                label: 'Expenses',
                data: [3000, 4000, 3500, 5000, 6000, 5500, 7000, 6500, 7500, 8000, 8500, 9000],
                backgroundColor: colors.mediumgrey,
            },
        ],
    };

    const chartOptions: any = {
        responsive: true,
        borderRadius: 5,
        barThikness: 100,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        return `${label}: $${value}`;
                    }
                }
            },
            datalabels: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'Month'
                }
            },
            y: {
                title: {
                    display: false,
                    text: 'Amount ($)'
                },
                beginAtZero: true
            }
        },
    };

    return (
        <div style={{width, height}} className="finance-chart">
            <Bar width={width} height={height} data={chartData} options={chartOptions} />
        </div>
    );
}

export default MonthlyChart;