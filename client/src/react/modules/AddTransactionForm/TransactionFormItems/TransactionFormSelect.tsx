import { FC, SelectHTMLAttributes } from "react";
import TransactionFormWrapper from "./TransactionFormWrapper";

import "./transaction_input.scss"

type TransactionFormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    id: string;
    label: string;
    values: {value: string, label: string}[];
    defaultValue: string;
}

const TransactionFormSelect : FC<TransactionFormSelectProps> = ({id, label, values, ...props}) => {
    return (
        <TransactionFormWrapper id={id} label={label}>
            <select id={id} {...props} className={"transaction-input transaction-select " + props.className}>
                {
                    values.map((value) => {
                        return <option key={value.value} value={value.value}>{value.label}</option>
                    })
                }
            </select>
        </TransactionFormWrapper>
    )
}

export default TransactionFormSelect;