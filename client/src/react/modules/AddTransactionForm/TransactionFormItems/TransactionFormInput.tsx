import {FC, InputHTMLAttributes} from "react";
import TransactionFormWrapper from "./TransactionFormWrapper";

type TransactionFormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
}

const TransactionFormInput : FC<TransactionFormInputProps> = ({id, label, ...props}) => {
    return (
        <TransactionFormWrapper id={id} label={label}>
            <input type="text" id={id} {...props}/>
        </TransactionFormWrapper>
    )
}

export default TransactionFormInput;