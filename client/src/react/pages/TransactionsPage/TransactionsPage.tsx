import Layout from "../../components/Layout/Layout";
import { GoPlus } from "react-icons/go";
import "./transaction_page.scss";
import Button from "../../UI/Button/Button";
import TransactionStatsItem from "../../components/TransactionStatsItem/TransactionStatsItem";
import Select from "react-select";
import Wrapper from "../../UI/Wrapper/Wrapper";
import Modal from "../../UI/Modal/Modal";
import useToggle from "../../hooks/useToggle";
import AddTransactionForm from "../../modules/AddTransactionForm/AddTransactionForm";
import { AmountType } from "../../types/amountType";
import TransactionTable from "../../modules/TransactionTable/TransactionTable";

const options = [
    { value: 'Last Week', label: 'Last Week' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'Last Year', label: 'Last Year' },
];
  
const TransactionsPage = () => {
    const [isOpen, toggleIsOpen] = useToggle(false);
    return (
        <section className="transactions">
            <Layout>
                <h1>Transactions</h1>
                <p>Welcome to your transactions!</p>
                <Button
                    onClick={toggleIsOpen}
                    title={<><GoPlus size={25}/> <span>Add transaction</span></>} 
                    className="add-transaction"/>

                <div className="transactions-content">
                    <div className="transactions-wrapper">
                        <div className="transactions-stats">
                            <TransactionStatsItem 
                                type={AmountType.INCOME}
                                value={9999.99}/>
                                
                            <TransactionStatsItem 
                                type={AmountType.EXPENSE}
                                value={999.99}/>
                        </div>

                        <div className="transactions-select">
                            <Select 
                                className="select"
                                defaultValue={options[1]}
                                options={options}/>
                        </div>
                    </div>
                    
                    <Wrapper title="Transaction History" width="78vw" height="70vh">
                        {/* <ComposedTable /> */}
                        <TransactionTable />
                    </Wrapper>
                </div>

                <Modal 
                    title="Add transaction"
                    onClose={toggleIsOpen}
                    height="300px"
                    isOpen = {isOpen}>
                        <AddTransactionForm onClose={toggleIsOpen}/>
                </Modal>
            </Layout>
        </section>
    )
}

export default TransactionsPage;