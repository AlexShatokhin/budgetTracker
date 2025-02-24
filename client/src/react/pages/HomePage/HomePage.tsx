import FinanceChart from "../../components/FinanceChart/FinanceChat";
import Layout from "../../components/Layout/Layout"
import MonthlyChart from "../../components/MonthlyChart/MonthlyChart";
import Table from "../../components/Table/Table";
import { useTypedSelector } from "../../hooks/useRedux";
import Wrapper from "../../UI/Wrapper/Wrapper";


const HomePage = () => {
    const {email} = useTypedSelector(state => state.authorization);
    return (
        <section className="home">
            <Layout>
                <h1>Hello, {email}</h1>
                <p>Welcome to your financial insights.</p>

                <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                    <Wrapper titleInfo="Expense Chart" title="Expense Chart" width="300px" height="330px">
                        <FinanceChart width="300px" height="330px"/>
                    </Wrapper>
                    <Wrapper title="Recent Transactions" width="calc(100% - 450px)" height="330px">
                        <Table />
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