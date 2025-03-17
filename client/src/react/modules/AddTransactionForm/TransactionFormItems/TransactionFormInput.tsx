import {FC, InputHTMLAttributes, TextareaHTMLAttributes} from "react";
import TransactionFormWrapper from "./TransactionFormWrapper";

import "./transaction_input.scss"

type TransactionFormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
}

const TransactionFormInput : FC<TransactionFormInputProps> = ({id, label, ...props}) => {

    if(props.type === "textarea"){
        const textareaProps = props as TextareaHTMLAttributes<HTMLTextAreaElement>;
        return (
            <TransactionFormWrapper id={id} label={label}>
                <textarea id={id} {...textareaProps} className={"transaction-input " + props.className}/>
            </TransactionFormWrapper>
        )
    }

    return (
        <TransactionFormWrapper id={id} label={label}>
            <input type="text" id={id} {...props} className={"transaction-input " + props.className}/>
        </TransactionFormWrapper>
    )
}

export default TransactionFormInput;