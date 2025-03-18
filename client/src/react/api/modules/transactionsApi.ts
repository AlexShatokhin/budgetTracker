import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { TransactionType } from "../../types/TransactionType";


export const transactionsApi = createApi({
    reducerPath: "transactionsApi",
    baseQuery,
    endpoints: (build) => ({
        addNewTransaction: build.mutation<{message: string}, TransactionType>({
            query: (body) => ({
                method: "POST",
                url: "/transactions",
                body
            })
        }),
        getTransactions: build.query<any, void>({
            query: () => "/transactions"
        })
    })
})

export const {
    useAddNewTransactionMutation,
    useGetTransactionsQuery
} = transactionsApi