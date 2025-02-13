import FinanceChart from "../../components/FinanceChart/FinanceChat";
import Layout from "../../components/Layout/Layout"


const HomePage = () => {
    return (
        <section className="home">
            <Layout>
                <h1>Hello, ...</h1>
                <p>Welcome to your financial insights.</p>

                <FinanceChart />
            </Layout>
        </section>
    )
}

export default HomePage;