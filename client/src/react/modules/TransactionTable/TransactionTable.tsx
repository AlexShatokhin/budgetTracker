import {FC} from 'react';
import ComposedTable from "../../components/Table/ComposedTable";
import { FaCalendar, FaMoneyBillWave } from "react-icons/fa";
import { BsChatSquareTextFill } from "react-icons/bs";
import { FiTable } from "react-icons/fi";
import { Column } from "@table-library/react-table-library/types/compact";
import { TableNode } from "@table-library/react-table-library";
import { TransactionTableItem } from '../Transactions/TrasactionTableItemType';
import useStorage from '../../hooks/useStorage';
import { FaTrash } from "react-icons/fa";
import { useDeleteTransactionsMutation } from '../../api/modules/transactionsApi';

type TransactionTableProps = {
    data: TransactionTableItem[],
    disabled?: boolean
}

const TransactionTable : FC<TransactionTableProps> = ({data, disabled = false}) => {
    const [deleteTransactions] = useDeleteTransactionsMutation();
    
    const currency = useStorage().getItem("currency") || "USD";
    const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₽";

    const sortFunctions = {
        DATE: (array: TransactionTableItem[]) => array.sort((a, b) => +a.date - +b.date),
        AMOUNT: (array: TransactionTableItem[]) => array.sort((a, b) => a.amount - b.amount),
        CATEGORY: (array: TransactionTableItem[]) => array.sort((a, b) => (a.category ?? "").localeCompare(b.category ?? "")),
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
            renderCell: (item : any) => (item.type === "expense" ? " - " : "") + item.amount + " " + currencySymbol,
            sort: {sortKey: "AMOUNT"}
        },
        {
          label: <span><FiTable /> Category</span> ,
          renderCell: (item : any) => item.category,
          sort: {sortKey: "CATEGORY"}
        },
      ];


    const renderOnSelect = (ids: number[]) => {
        console.log(ids);
        return (
            <button onClick={() => deleteTransactions(ids)} className="transactions-delete">
                <FaTrash /> <span>Remove {ids.length} note(s)</span>
            </button>
        )
    }

    return (
        <div className={`transactions-table ${disabled ? "transactions-table-disabled" : ""}`}>
            <ComposedTable 
                data={data}
                sortFns={sortFunctions}
                render={renderOnSelect}
                columns={COLUMNS as unknown as Column<TableNode>[]}/>
        </div>
    )
}

export default TransactionTable;