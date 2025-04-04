import {FC, useState} from "react";
import { colors } from "../../../constants/colors";
import { useGetTransactionCategoriesQuery, useGetTransactionGroupedByCategoryQuery, useGetTransactionsByCategoryQuery } from "../../api/modules/transactionsApi";
import { AmountType } from "../../types/amountType";
import TotalChart from "./TotalChart";
import ComposedTable from "../../components/Table/ComposedTable";
import { FaCalendar, FaMoneyBillWave } from "react-icons/fa";
import { BsChatSquareTextFill } from "react-icons/bs";
import { Column } from "@table-library/react-table-library/types/compact";
import { TableNode } from "@table-library/react-table-library";
import { TransactionServerResponse } from "../../types/TransactionServerResponse";
import { TransactionTableItem } from "../Transactions/TrasactionTableItemType";
import "./categories_transactions.scss"
import useQueryState from "../../hooks/useQueryState";

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

type TransactionsItemRaw = {
    id: number,
    category: string,
    totalAmount: string,
    percentage: string
}

type TransactionsItem = {
    label: string,
    data: [number, number],
    value: string,
    backgroundColor: string
}

const CategoriesTransaction : FC<CategoriesTransactionProps> = ({type, timeFormat}) => {
    console.log(type, timeFormat);
    const [categoryID, setCategoryID] = useState<number>(-1);
    const {data, isFetching : chartFetching} = useGetTransactionGroupedByCategoryQuery({type, ...getTimeInterval(timeFormat)});
    const categories = useGetTransactionCategoriesQuery();
    const {data: transactionsByCategory, isFetching, isError} = useGetTransactionsByCategoryQuery({id: categoryID, ...getTimeInterval(timeFormat)}, {skip: categoryID === -1});
    const Component = useQueryState(isFetching, isError, transactionsByCategory, );
    console.log(transactionsByCategory);
    

    const chartFormat = {
        labels: [""],
        datasets: data?.result.map((item : TransactionsItemRaw, index : number) => {
            return {
                label: item.category,
                data: [item.percentage, item.id], 
                value: item.totalAmount,
                backgroundColor: labelColors[index % labelColors.length],
            }
        }).sort((a : TransactionsItem, b : TransactionsItem) => b.data[0] - a.data[0]) || []
    }

    const getCategoryIdByClick = (_event: any, elements: { datasetIndex: number }[]) => {
        let categoryId : number = -1;
        if (elements.length > 0) {
            categoryId = chartFormat.datasets[elements[0].datasetIndex].data[1];
        }
        setCategoryID(categoryId);
    }

    const COLUMNS  = [
        { 
            label: <span><FaCalendar /> Date</span>, 
            renderCell: (item : any) => item.date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            }), 
            select: true ,
            sort: {sortKey: "DATE"}
        },
        {
          label: <span><BsChatSquareTextFill /> Description</span> ,
          renderCell: (item : any) => item.description,
        },
        { label: <span><FaMoneyBillWave /> Amount</span>, 
            renderCell: (item : any) => (item.type === "expense" ? " - " : "") + item.amount + " $",
            sort: {sortKey: "AMOUNT"}
        },
      ];

    const formatData = (data: TransactionServerResponse) : TransactionTableItem[] => {
        return data.result.map((item) => {
            return {
                id: item.id,
                date: new Date(item.date),
                description: item.note,
                amount: item.amount,
                type: item.type.toUpperCase()
            }
        })
    }

    return (
        <div className="categories-content">
            <TotalChart isLoading = {chartFetching} onClick={getCategoryIdByClick} data={chartFormat}/>
            <div className="categories-content__list">
                {
                    Component || transactionsByCategory &&   
                        <>
                            <div className="categories-content__title">{transactionsByCategory.result[0].category}</div>
                            <ComposedTable 
                                itemsPerPage={6}
                                columns={COLUMNS as unknown as Column<TableNode>[]}
                                data={formatData(transactionsByCategory as TransactionServerResponse)}
                                sortFns={{}}
                                isSelect={false}
                                columnsStyle="minmax(0px, 1fr) minmax(0px, 2fr) minmax(0px, 1fr)"/>
                        </>
                }

            </div>
        </div>
    )
}

export default CategoriesTransaction;