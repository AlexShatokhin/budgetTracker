import ComposedTable from "../../components/Table/ComposedTable";
import { useGetTransactionsQuery } from "../../api/modules/transactionsApi";
import { TransactionServerType } from "../../types/TransactionType";
import { FaCalendar, FaMoneyBillWave } from "react-icons/fa";
import { BsChatSquareTextFill } from "react-icons/bs";
import { FiTable } from "react-icons/fi";
import { Column } from "@table-library/react-table-library/types/compact";
import { TableNode } from "@table-library/react-table-library";

type TransactionTableItem = {
    id: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    type: string;
}

const TransactionTable = () => {
    const {data} = useGetTransactionsQuery();
    console.log(data)
    const convertedData : TransactionTableItem[] = data?.result?.map((item : TransactionServerType) => ({id: item.id, date: new Date(item.date), description: item.note, amount: item.amount, category: item.category, type: item.type})) || [];
    const sortFunctions = {
        DATE: (array: TransactionTableItem[]) => array.sort((a, b) => +a.date - +b.date),
        AMOUNT: (array: TransactionTableItem[]) => array.sort((a, b) => a.amount - b.amount),
        CATEGORY: (array: TransactionTableItem[]) => array.sort((a, b) => a.category.localeCompare(b.category)),
    }
    const COLUMNS  = [
        { 
            label: <span><FaCalendar /> Date</span>, 
            renderCell: (item : any) => item.date.toLocaleDateString('en-US', {
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
        {
          label: <span><FiTable /> Category</span> ,
          renderCell: (item : any) => item.category,
          sort: {sortKey: "CATEGORY"}
        },
      ];

    return (
        <ComposedTable 
            data={convertedData}
            sortFns={sortFunctions}
            columns={COLUMNS as unknown as Column<TableNode>[]}/>
    )
}

export default TransactionTable;