import { TransactionServerType } from "./TransactionType";

export type TransactionServerResponse = {
    message: string;
    result: TransactionServerType[];
    total: {
        income: number;
        expense: number;
    }
}