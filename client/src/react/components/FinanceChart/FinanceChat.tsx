import {FC} from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { colors } from "../../../constants/colors";
import { useGetAmountsByCategoryQuery } from "../../api/modules/transactionsApi";
import { AmountType } from "../../types/amountType";

// Регистрация компонентов
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type FinanceChartProps = {
    width: string;
    height: string;
    labels: string[];
    data: number[];
}

const FinanceChart : FC<FinanceChartProps> = ({width, height, labels, data}) => {
    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: [
                    colors.darkblue,
                    colors.blue,
                    colors.lightblue,
                    colors.darkgrey,
                    colors.grey,
                    colors.mediumgrey,
                ],
            },
        ],
    };

    const chartOptions: any = {
        layout: {
            padding: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${percentage}%`;
                    }
                }
            },
            datalabels: {
                formatter: (value: any, context: any) => {
                    const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    const label = chartData.labels[context.dataIndex];
                    return `${label}\n${percentage}%`;
                },
                color: '#000',
                font: {
                    weight: '400',
                    size: 12
                },
                align: "end",
                anchor: "end",
                offset: 3,
            }
        }
    };

    return (
        <div style={{width, height, margin: "0 auto"}} className="expense-chart">
            <Pie data={chartData} options={chartOptions} />
        </div>
    );
}

export default FinanceChart;