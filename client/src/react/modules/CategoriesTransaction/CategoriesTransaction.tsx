import { colors } from "../../../constants/colors";
import { useGetTransactionGroupedByCategoryQuery } from "../../api/modules/transactionsApi";
import { AmountType } from "../../types/amountType";
import TotalChart from "./TotalChart";

const labelColors = [colors.lightblue, colors.red, colors.purple, colors.green, colors.yellow, colors.darkgreen, colors.orange]

const CategoriesTransaction = () => {
    const {data, isFetching} = useGetTransactionGroupedByCategoryQuery({type: AmountType.EXPENSE, start: "2023-01-01", end: "2025-12-31"});
    console.log(data?.result);
    const chartFormat = {
        labels: [""],
        datasets: data?.result.map((item : {category: string, totalAmount: string, percentage: string}, index : number) => {
            return {
                label: item.category,
                data: [item.percentage], 
                value: item.totalAmount,
                backgroundColor: labelColors[index % labelColors.length],
            }
        }) || []
    }
    return (
        <div className="content">
            {!isFetching ? <TotalChart data={chartFormat}/> : "Loading..."}
        </div>
    )
}

export default CategoriesTransaction;