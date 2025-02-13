import FinanceChart from "../../components/FinanceChart/FinanceChat";
import Layout from "../../components/Layout/Layout"
import MonthlyChart from "../../components/MonthlyChart/MonthlyChart";


const HomePage = () => {
    return (
        <section className="home">
            <Layout>
                <h1>Hello, ...</h1>
                <p>Welcome to your financial insights.</p>

                <FinanceChart />
                <MonthlyChart />
            </Layout>
        </section>
    )
}

export default HomePage;