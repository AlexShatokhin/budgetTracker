import { FC, SelectHTMLAttributes } from "react";
import TransactionFormWrapper from "./TransactionFormWrapper";

type TransactionFormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    id: string;
    label: string;
}

const TransactionFormSelect : FC<TransactionFormSelectProps> = ({id, label, ...props}) => {
    return (
        <TransactionFormWrapper id={id} label={label}>
            <select id={id} {...props}>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
        </TransactionFormWrapper>
    )
}

export default TransactionFormSelect;