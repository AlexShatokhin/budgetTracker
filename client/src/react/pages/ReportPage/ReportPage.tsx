import { useState } from "react";
import Select from "react-select";
import Switch from "react-switch";
import Layout from "../../components/Layout/Layout";
import CategoriesTransaction from "../../modules/CategoriesTransaction/CategoriesTransaction";
import Wrapper from "../../UI/Wrapper/Wrapper";
import { SingleValue } from "react-select";
import { AmountType } from "../../types/amountType";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdMoneyOffCsred } from "react-icons/md";
import { colors } from "../../../constants/colors";

const options = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'year', label: 'Last Year' },
];
const getTimeInterval = (value: string) => {
    
    let result = {
        start: new Date(),
        end: new Date()
    }

    if(value === 'week') {
        result.start = new Date(result.start.setDate(result.start.getDate() - 7));
    }

    if(value === 'month') {
        result.start = new Date(result.start.setMonth(result.start.getMonth() - 1));
    }

    if(value === 'year') {
        result.start = new Date(result.start.setFullYear(result.start.getFullYear() - 1));
    }

    return {start: result.start.toDateString(), end: result.end.toDateString()};
}

const ReportPage = () => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<{value: string, label: string}>>(options[1]);
    const [selectedAmountType, setSelectedAmountType] = useState<AmountType>(AmountType.INCOME)
    
    return (
        <section className="reports">
            <Layout>
                <h1>Reports</h1>
                <p>Here you can see your reports</p>
                
                <div className="report-config">
                    <Select 
                        onChange={(option) => setSelectedOption(option)}
                        className="select"
                        defaultValue={selectedOption}
                        options={options}/>
                    <span>Expense</span>
                    <Switch 
                        offColor={colors.red}
                        onColor={colors.green}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        checked={selectedAmountType === AmountType.INCOME}
                        onChange={(checked) => setSelectedAmountType(checked ? AmountType.INCOME : AmountType.EXPENSE)}/>
                    <span>Income</span>
                </div>

                <div className="reports-content">
                    <Wrapper title="Categoeies" width="calc(100% - 90px)" height="550px">
                        <CategoriesTransaction type={selectedAmountType} timeFormat={selectedOption!.value || "month"}/>
                    </Wrapper>
                </div>
            </Layout>
        </section>
    )
}

export default ReportPage;