import Layout from "../../components/Layout/Layout"
import MonthlyChart from "../../components/MonthlyChart/MonthlyChart";
import { useTypedSelector } from "../../hooks/useRedux";
import { Link } from "react-router-dom";
import { IoChevronForwardSharp } from "react-icons/io5";
import Wrapper from "../../UI/Wrapper/Wrapper";
import "./homepage.scss"
import CompactTransactionTable from "../../modules/TransactionTable/CompactTransactionTable";
import FinancePieChart from "../../modules/FinancePieChart/FinancePieChart";

const HomePage = () => {
    const {email} = useTypedSelector(state => state.authorization);
    return (
        <section className="home">
            <Layout>
                <h1>Hello, {email}</h1>
                <p>Welcome to your financial insights.</p>

                <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                    <Wrapper titleInfo="Expense Chart" title="" width="350px" height="350px">
                        <FinancePieChart />
                    </Wrapper>
                    <Wrapper className="transactions-compact" title="Recent Transactions" width="calc(100% - 500px)" height="350px">
                        <CompactTransactionTable />
                        <Link to="/transactions"> <span>View all</span> <IoChevronForwardSharp /></Link>
                    </Wrapper>
                </div>
                <Wrapper titleInfo="Monthly Income and Expenses" title="Monthly Income and Expenses" width="calc(100% - 90px)" height="330px">
                    <MonthlyChart width="1500px" height="300px" />
                </Wrapper>
            </Layout>
        </section>
    )
}

export default HomePage;