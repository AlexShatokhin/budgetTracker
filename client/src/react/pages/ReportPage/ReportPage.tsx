import { useState } from "react";
import Select from "react-select";
import Switch from "react-switch";
import Layout from "../../components/Layout/Layout";
import CategoriesTransaction from "../../modules/CategoriesTransaction/CategoriesTransaction";
import Wrapper from "../../UI/Wrapper/Wrapper";
import { SingleValue } from "react-select";
import { AmountType } from "../../types/amountType";
import { colors } from "../../../constants/colors";

import "./report_page.scss";
const options = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'year', label: 'Last Year' },
];

const ReportPage = () => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<{value: string, label: string}>>(options[1]);
    const [selectedAmountType, setSelectedAmountType] = useState<AmountType>(AmountType.INCOME)
    
    return (
        <section className="reports">
            <Layout>
                <h1>Reports</h1>
                <p>Here you can see your reports</p>
                
                <div className="report-config">
                    <div className="report-switch">
                        <span onClick={() => setSelectedAmountType(AmountType.EXPENSE)} className={selectedAmountType === AmountType.EXPENSE ? "choosen" : ""}>Expense</span>
                        <Switch 
                            offColor={colors.red}
                            onColor={colors.green}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            checked={selectedAmountType === AmountType.INCOME}
                            onChange={(checked) => setSelectedAmountType(checked ? AmountType.INCOME : AmountType.EXPENSE)}/>
                        <span onClick={() => setSelectedAmountType(AmountType.INCOME)} className={selectedAmountType === AmountType.INCOME ? "choosen" : ""}>Income</span>
                    </div>
                    <Select 
                        onChange={(option) => setSelectedOption(option)}
                        className="select"
                        defaultValue={selectedOption}
                        options={options}/>
                </div>

                <div className="reports-content">
                    <Wrapper title="Categories transactions" titleInfo="Click on the chart item to find out the transactions for that category " width="calc(100% - 90px)" height="700px">
                        <CategoriesTransaction type={selectedAmountType} timeFormat={selectedOption!.value || "month"}/>
                    </Wrapper>
                </div>
            </Layout>
        </section>
    )
}

export default ReportPage;