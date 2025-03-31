import Layout from "../../components/Layout/Layout";
import CategoriesTransaction from "../../modules/CategoriesTransaction/CategoriesTransaction";
import Wrapper from "../../UI/Wrapper/Wrapper";


const ReportPage = () => {
    return (
        <section className="reports">
            <Layout>
                <h1>Reports</h1>
                <p>Here you can see your reports</p>
                
                <div className="reports-content">
                    <Wrapper title="Categoeies" width="calc(100% - 90px)" height="550px">
                        <CategoriesTransaction />
                    </Wrapper>
                </div>
            </Layout>
        </section>
    )
}

export default ReportPage;