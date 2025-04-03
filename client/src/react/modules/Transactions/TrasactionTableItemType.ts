export type TransactionTableItem = {
    id: string;
    date: Date;
    description: string;
    amount: number;
    category?: string;
    type: string;
}