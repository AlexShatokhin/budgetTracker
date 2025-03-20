import { useEffect, useState } from "react";
import TransactionStatsItem from "../../components/TransactionStatsItem/TransactionStatsItem"
import { AmountType } from "../../types/amountType"
import Select, { SingleValue } from "react-select";
import Wrapper from "../../UI/Wrapper/Wrapper";
import TransactionTable from "../TransactionTable/TransactionTable";
import { TransactionServerType } from "../../types/TransactionType";
import { useGetTransactionsQuery } from "../../api/modules/transactionsApi";
import { TransactionTableItem } from "./TrasactionTableItemType";

const options = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'year', label: 'Last Year' },
];
  
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

const Transactions = () => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<{value: string, label: string}>>(options[1]);

    const {data} = useGetTransactionsQuery(getTimeInterval(selectedOption?.value || 'month'));
    const convertedTableData : TransactionTableItem[] = data?.result?.map((item : TransactionServerType) => ({id: item.id, date: new Date(item.date), description: item.note, amount: item.amount, category: item.category, type: item.type})) || [];
    const totalIncome = data?.total.income || 0;
    const totalExpense = data?.total.expense || 0; 

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className="transactions-content">
            <div className="transactions-wrapper">
                <div className="transactions-stats">
                    <TransactionStatsItem 
                        type={AmountType.INCOME}
                        value={totalIncome}/>
                        
                    <TransactionStatsItem 
                        type={AmountType.EXPENSE}
                        value={totalExpense}/>
                </div>

                <div className="transactions-select">
                    <Select 
                        onChange={(option) => setSelectedOption(option)}
                        className="select"
                        defaultValue={selectedOption}
                        options={options}/>
                </div>
            </div>
            
            <Wrapper title="Transaction History" width="78vw" height="70vh">
                <TransactionTable data={convertedTableData}/>
            </Wrapper>
        </div>
    )
}

export default Transactions