import Layout from "../../components/Layout/Layout";
import SettingsItem from "../../modules/SettingsItem/SettingsItem";
import ThemeToggling from "../../modules/ThemeToggling/ThemeToggling";
import Select from "react-select";
import Input from "../../UI/Input/Input";
import Wrapper from "../../UI/Wrapper/Wrapper";

import "./settings_page.scss"
import Button from "../../UI/Button/Button";
import CurrencySelect from "../../modules/CurrencySelect/CurrencySelect";
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
                    content={<>
                        <Input 
                            type="password" 
                            placeholder="Current password"
                            width="100%"
                            height="50px"
                            className="settings-input"/>
                        <Input
                            type="password" 
                            placeholder="New password"
                            width="100%"
                            height="50px"
                            className="settings-input"/>
                        <Input
                            type="password" 
                            placeholder="Repeat new password"
                            width="100%"
                            height="50px"
                            className="settings-input"/>
                        <Button
                            title="Change password"/>
                    </>}/>
                </Wrapper>

            </Layout>
        </section>
    )
}

export default SettingsPage;