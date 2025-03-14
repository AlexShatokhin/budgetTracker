import { FC } from "react";

type TransactionFormWrapperProps = {
    children: React.ReactNode;
    id: string;
    label: string;
}


const TransactionFormWrapper : FC<TransactionFormWrapperProps> = ({children, id, label}) => {
    return (
        <div key = {id} className="transaction-item">
            <label htmlFor={id}>{label}</label>
            <div className="transaction-item-wrapper">
                {children}
            </div>
        </div>
    )
}

export default TransactionFormWrapper;