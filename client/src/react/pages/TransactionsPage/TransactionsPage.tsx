import Layout from "../../components/Layout/Layout";
import { GoPlus } from "react-icons/go";
import "./transaction_page.scss";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import useToggle from "../../hooks/useToggle";
import AddTransactionForm from "../../modules/AddTransactionForm/AddTransactionForm";
import Transactions from "../../modules/Transactions/Transactions";
import useWindowDimensions from "../../hooks/useWindowDimensions";


const TransactionsPage = () => {
    const [isOpen, toggleIsOpen] = useToggle(false);
    const {width} = useWindowDimensions();
    const isMobile = width <= 1200;
    return (
        <section className="transactions">
            <Layout>
                <h1>Transactions</h1>
                <p>Welcome to your transactions!</p>
                <Button
                    onClick={toggleIsOpen}
                    title={isMobile ? <><GoPlus size={30}/></> : <><GoPlus size={25}/> <span>Add transaction</span></>} 
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