import Layout from "../../components/Layout/Layout";
import SettingsItem from "../../modules/SettingsItem/SettingsItem";
import ThemeToggling from "../../modules/ThemeToggling/ThemeToggling";
import Wrapper from "../../UI/Wrapper/Wrapper";

import "./settings_page.scss"
import CurrencySelect from "../../modules/CurrencySelect/CurrencySelect";
import ChangePassword from "../../modules/ChangePassword/ChangePassword";
const SettingsPage = () => {
    return (
        <section className="settings">
            <Layout>
                <Wrapper title="Settings" width="78vw" height="80vh" className="settings-wrapper">
                <SettingsItem 
                    title="Preference mode"
                    subtitle="Choose your preferred mode"
                    content={<ThemeToggling />}/>
                <SettingsItem 
                    title="Preference currnecy"
                    subtitle="Choose your preferred currency"
                    content={<CurrencySelect />}/>
               <SettingsItem 
                    title="Change password"
                    subtitle="Change your website password"
                    content={<ChangePassword />}/>
                </Wrapper>

            </Layout>
        </section>
    )
}

export default SettingsPage;