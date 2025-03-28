import Layout from "../../components/Layout/Layout";
import Wrapper from "../../UI/Wrapper/Wrapper";


const ReportPage = () => {
    return (
        <section className="reports">
            <Layout>
                <h1>Reports</h1>
                <p>Here you can see your reports</p>

                <div className="reports-content">
                    <Wrapper title="Categoeies">
                        <p>Here you can see your categories</p>
                    </Wrapper>
                </div>
            </Layout>
        </section>
    )
}

export default ReportPage;