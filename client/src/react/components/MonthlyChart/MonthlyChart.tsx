import {FC} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { colors } from "../../../constants/colors";
import { useGetMonthlyTransactionsQuery } from "../../api/modules/transactionsApi";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

type MonthlyChartProps = {
    width: string;
    height: string; 
}

const MonthlyChart : FC<MonthlyChartProps> = ({width, height}) => {
    const {data} = useGetMonthlyTransactionsQuery();
    const chartData = {
        labels: data?.result.map((item) => item.month) || [],
        datasets: [
            {
                label: 'Income',
                data: data?.result.map((item) => item.income) || [],
                backgroundColor: colors.blue,
            },
            {
                label: 'Expenses',
                data: data?.result.map((item) => item.expenses) || [],
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