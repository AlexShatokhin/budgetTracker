import {FC} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { colors } from "../../../constants/colors";
import { useGetMonthlyTransactionsQuery } from "../../api/modules/transactionsApi";
import Spinner from "../../UI/Spinner/Spinner";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

type MonthlyChartProps = {
    width: string;
    height: string; 
}

const MonthlyChart : FC<MonthlyChartProps> = ({width, height}) => {
    const {data, isFetching, isError} = useGetMonthlyTransactionsQuery();
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
        <div style={{width, height,position: "relative"}} className="finance-chart">
            {isFetching && <Spinner />}
            {isError && <div className="error-message">Something went wrong</div>}
            {!isFetching && data?.result.length === 0 && <div className="empty-data">No data available</div>}
            {!isFetching  && data && data?.result.length > 0 &&  <Bar width={width} height={height} data={chartData} options={chartOptions} />}
            
        </div>
    );
}

export default MonthlyChart;