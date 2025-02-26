import Layout from "../../components/Layout/Layout";
import { GoPlus } from "react-icons/go";
import "./transaction_page.scss";
import Button from "../../UI/Button/Button";
import TransactionStatsItem from "../../components/TransactionStatsItem/TransactionStatsItem";

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
                    <div className="transactions-stats">
                        <TransactionStatsItem 
                            type="INCOME"
                            value={9999.99}/>
                            
                        <TransactionStatsItem 
                            type="EXPENSE"
                            value={999.99}/>

                    </div>
                </div>
            </Layout>
        </section>
    )
}

export default TransactionsPage;