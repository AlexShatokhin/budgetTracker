import TransactionStatsItem from "../../components/TransactionStatsItem/TransactionStatsItem"
import { AmountType } from "../../types/amountType"
import Select from "react-select";
import Wrapper from "../../UI/Wrapper/Wrapper";
import TransactionTable from "../TransactionTable/TransactionTable";
import { TransactionServerType } from "../../types/TransactionType";
import { useGetTransactionsQuery } from "../../api/modules/transactionsApi";
import { TransactionTableItem } from "./TrasactionTableItemType";

const options = [
    { value: 'Last Week', label: 'Last Week' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'Last Year', label: 'Last Year' },
];
  

const Transactions = () => {
    const {data} = useGetTransactionsQuery();
    console.log(data)
    const convertedTableData : TransactionTableItem[] = data?.result?.map((item : TransactionServerType) => ({id: item.id, date: new Date(item.date), description: item.note, amount: item.amount, category: item.category, type: item.type})) || [];
    const totalIncome = data?.total.income || 0;
    const totalExpense = data?.total.expense || 0; 

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
                        className="select"
                        defaultValue={options[1]}
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