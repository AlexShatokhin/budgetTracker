import FinanceChart from "../../components/FinanceChart/FinanceChat";
import Layout from "../../components/Layout/Layout"
import MonthlyChart from "../../components/MonthlyChart/MonthlyChart";
import { useTypedSelector } from "../../hooks/useRedux";


const HomePage = () => {
    const {email} = useTypedSelector(state => state.authorization);
    return (
        <section className="home">
            <Layout>
                <h1>Hello, {email}</h1>
                <p>Welcome to your financial insights.</p>

                <FinanceChart />
                <MonthlyChart />
            </Layout>
        </section>
    )
}

export default HomePage;