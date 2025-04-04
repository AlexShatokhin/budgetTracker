import { useState } from "react";
import FinanceChart from "../../components/FinanceChart/FinanceChat";
import { useGetAmountsByCategoryQuery } from "../../api/modules/transactionsApi";
import { AmountType } from "../../types/amountType";
import "./finance_pie_chart.scss";
import useQueryState from "../../hooks/useQueryState";

const FinancePieChart = () => {
        const {data, isFetching, isError} = useGetAmountsByCategoryQuery();
        const Component = useQueryState(isFetching, isError, data, {
            errorWidth: 200,
            errorHeight: 200,
        });
        const [dataType, setDataType] = useState(AmountType.EXPENSE);
        const neededTransactions = data?.result.filter((transaction) => transaction.type.toUpperCase() === dataType) || [];
        const labels : string[] = neededTransactions?.map((transaction) => transaction.category);
        const values : number[] = neededTransactions?.map((transaction) => transaction.amount);
    
    return (
        <div className="finance-chart">

            {Component || 
             <>
            <div className="chart-mode">
                <button className={dataType === AmountType.EXPENSE ? "active" : ""} onClick={() => setDataType(AmountType.EXPENSE)}>Expense</button>
                <button className={dataType === AmountType.INCOME ? "active" : ""} onClick={() => setDataType(AmountType.INCOME)}>Income</button>
            </div>
            <FinanceChart labels={labels} data={values} width="330px" height="380px"/>
             </>}
           
        </div>
    )
}

export default FinancePieChart;