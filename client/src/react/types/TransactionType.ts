import { AmountType } from "./amountType";

export type TransactionDefaultType = {
    amount: number;
    type: AmountType;
    category: string;
    date: string;
    time: string;
}

export type TransactionClientType = TransactionDefaultType & {
    id: string;
    description: string;
}

export type TransactionServerType = TransactionDefaultType & {
    id: string;
    note: string;
}