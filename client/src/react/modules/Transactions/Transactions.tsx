import { useEffect, useState } from "react";
import TransactionStatsItem from "../../components/TransactionStatsItem/TransactionStatsItem"
import { AmountType } from "../../types/amountType"
import Select, { SingleValue } from "react-select";
import Wrapper from "../../UI/Wrapper/Wrapper";
import TransactionTable from "../TransactionTable/TransactionTable";
import { TransactionServerType } from "../../types/TransactionType";
import { useGetTransactionsQuery } from "../../api/modules/transactionsApi";
import { TransactionTableItem } from "./TrasactionTableItemType";
import getTimeInterval from "../../helpers/getTimeInterval";
import { colors } from "../../../constants/colors";

const options = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'year', label: 'Last Year' },
];

const Transactions = () => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<{value: string, label: string}>>(options[1]);

    const {data, isFetching} = useGetTransactionsQuery(getTimeInterval(selectedOption?.value || 'month'));
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
                        styles={{
                            control: (baseStyles) => ({
                              ...baseStyles,
                              backgroundColor: "var(--wrapper-bg-color)",
                              color: "var(--text-color)",
                              width: "200px",
                              height: "50px",
                              borderRadius: "10px",
                              padding: "0 10px",
                            }),
                            option: (baseStyles) => ({
                                ...baseStyles,
                                color: colors.black,
                            }),
                            singleValue: (baseStyles) => ({
                                ...baseStyles,
                                color: "var(--color-text)", 
                            }),
                          }}
                        defaultValue={selectedOption}
                        options={options}/>
                </div>
            </div>
            
            <Wrapper title="Transaction History" width="78vw" height="75vh">
                <TransactionTable 
                    disabled={isFetching}
                    data={convertedTableData}/>
            </Wrapper>
        </div>
    )
}

export default Transactions