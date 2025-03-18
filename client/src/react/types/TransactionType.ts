import { AmountType } from "./amountType";

export type TransactionType = {
    amount: number;
    type: AmountType;
    category: string;
    date: string;
    time: string;
    description: string;
}