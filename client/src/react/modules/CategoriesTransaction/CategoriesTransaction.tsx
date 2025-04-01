import {FC} from "react";
import { colors } from "../../../constants/colors";
import { useGetTransactionCategoriesQuery, useGetTransactionGroupedByCategoryQuery } from "../../api/modules/transactionsApi";
import { AmountType } from "../../types/amountType";
import TotalChart from "./TotalChart";

const labelColors = [colors.lightblue, colors.red, colors.purple, colors.green, colors.yellow, colors.darkgreen, colors.orange]

const getTimeInterval = (value: string) => {
    
    let result = {
        start: new Date(),
        end: new Date()
    }

    if(value === 'week') {
        result.start = new Date(result.start.setDate(result.start.getDate() - 7));
    }

    if(value === 'month') {
        result.start = new Date(result.start.setMonth(result.start.getMonth() - 1));
    }

    if(value === 'year') {
        result.start = new Date(result.start.setFullYear(result.start.getFullYear() - 1));
    }

    return {start: result.start.toDateString(), end: result.end.toDateString()};
}

type CategoriesTransactionProps = {
    type: AmountType,
    timeFormat: string
}

const CategoriesTransaction : FC<CategoriesTransactionProps> = ({type, timeFormat}) => {
    console.log(type, timeFormat);
    const {data} = useGetTransactionGroupedByCategoryQuery({type, ...getTimeInterval(timeFormat)});
    const categories = useGetTransactionCategoriesQuery();
    console.log(categories.data);
    
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
        <div className="categories-content">
            <TotalChart data={chartFormat}/>
            <div className="categories-content__list">

            </div>
        </div>
    )
}

export default CategoriesTransaction;