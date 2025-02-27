import Layout from "../../components/Layout/Layout";
import { GoPlus } from "react-icons/go";
import "./transaction_page.scss";
import Button from "../../UI/Button/Button";
import TransactionStatsItem from "../../components/TransactionStatsItem/TransactionStatsItem";
import Select from "react-select";
import ComposedTable from "../../components/Table/ComposedTable";
import Wrapper from "../../UI/Wrapper/Wrapper";

const options = [
    { value: 'Last Week', label: 'Last Week' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'Last Year', label: 'Last Year' },
];
  
const TransactionsPage = () => {
    return (
        <section className="transactions">
            <Layout>
                <h1>Transactions</h1>
                <p>Welcome to your transactions!</p>
                <Button
                    title={<><GoPlus size={25}/> <span>Add transaction</span></>} 
                    className="add-transaction"/>

                <div className="transactions-content">
                    <div className="transactions-wrapper">
                        <div className="transactions-stats">
                            <TransactionStatsItem 
                                type="INCOME"
                                value={9999.99}/>
                                
                            <TransactionStatsItem 
                                type="EXPENSE"
                                value={999.99}/>
                        </div>

                        <div className="transactions-select">
                            <Select 
                                className="select"
                                defaultValue={options[1]}
                                options={options}/>
                        </div>
                    </div>
                    
                    <Wrapper title="Transaction History" width="78vw" height="68vh">
                        <ComposedTable />
                    </Wrapper>
                </div>
            </Layout>
        </section>
    )
}

export default TransactionsPage;