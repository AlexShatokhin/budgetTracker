import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Регистрация компонентов
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const FinanceChart = () => {
    const chartData = {
        labels: ["Food", "Transport", "Shopping", "Bills", "Others", "Entertainment"],
        datasets: [
            {
                data: [300, 50, 100, 200, 100, 150],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
            },
        ],
    };

    const chartOptions: any = {
        layout: {
            padding: {
                top: 60,
                bottom: 60,
                left: 60,
                right: 60
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
                    console.log(value, context);
                    const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    const label = chartData.labels[context.dataIndex];
                    return `${label}\n${percentage}%`;
                },
                color: '#000',
                font: {
                    weight: '400',
                    size: 15
                },
                align: "end",
                anchor: "end",
                offset: 10,
            }
        }
    };

    return (
        <div className="expense-chart">
            <h2>Expense Chart</h2>
            <Pie width={500} data={chartData} options={chartOptions} />
        </div>
    );
}

export default FinanceChart;