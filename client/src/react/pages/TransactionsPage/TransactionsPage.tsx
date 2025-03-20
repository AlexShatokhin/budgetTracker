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
import Transactions from "../../modules/Transactions/Transactions";

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
                <Transactions />
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