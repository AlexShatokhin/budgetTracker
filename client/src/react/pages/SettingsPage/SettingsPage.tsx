import Layout from "../../components/Layout/Layout";
import SettingsItem from "../../modules/SettingsItem/SettingsItem";
import ThemeToggling from "../../modules/ThemeToggling/ThemeToggling";


const SettingsPage = () => {
    return (
        <section className="settings">
            <Layout>
                <SettingsItem 
                    title="Preference mode"
                    subtitle="Choose your preferred mode"
                    content={<ThemeToggling />}/>

            </Layout>
        </section>
    )
}

export default SettingsPage;