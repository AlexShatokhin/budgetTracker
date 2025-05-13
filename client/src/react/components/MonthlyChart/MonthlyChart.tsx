import {FC} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { colors } from "../../../constants/colors";
import { useGetMonthlyTransactionsQuery } from "../../api/modules/transactionsApi";
import useQueryState from "../../hooks/useQueryState";
import useStorage from "../../hooks/useStorage";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

type MonthlyChartProps = {
    width: string;
    height: string; 
}

const MonthlyChart : FC<MonthlyChartProps> = ({width, height}) => {
    const {data, isFetching, isError} = useGetMonthlyTransactionsQuery();
    const {getItem} = useStorage();
    const theme = getItem("theme") || "light";

    const Component = useQueryState(isFetching, isError, data, {
        errorWidth: 250,
        errorHeight: 250,
    });

    const currency = useStorage().getItem("currency") || "USD";
    const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₽";


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
                        return `${label}: ${currencySymbol}${value}`;
                    }
                },
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
                },
                ticks: {
                    color: theme === "light" ? colors.black : colors.white,
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    grid: {
                        color: colors.lightgrey,
                        lineWidth: 1,
                    },
                }
            },
            y: {
                title: {
                    display: false,
                    text: `Amount (${currencySymbol})`
                },
                ticks: {
                    color: theme === "light" ? colors.black : colors.white,
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: colors.lightgrey,
                    lineWidth: 1,
                },
                beginAtZero: true
            }
        },
    };

    return (
        <div style={{width, height,position: "relative"}} className="finance-chart">
            {Component || <Bar width={width} height={height} data={chartData} options={chartOptions} />}
        </div>
    );
}

export default MonthlyChart;