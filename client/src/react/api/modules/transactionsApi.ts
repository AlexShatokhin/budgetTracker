import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { TransactionClientType } from "../../types/TransactionType";
import { TransactionServerResponse } from "../../types/TransactionServerResponse";


export const transactionsApi = createApi({
    reducerPath: "transactionsApi",
    baseQuery,
    endpoints: (build) => ({
        addNewTransaction: build.mutation<{message: string}, TransactionClientType>({
            query: (body) => ({
                method: "POST",
                url: "/transactions",
                body
            })
        }),
        getTransactions: build.query<TransactionServerResponse, void>({
            query: () => "/transactions"
        })
    })
})

export const {
    useAddNewTransactionMutation,
    useGetTransactionsQuery
} = transactionsApi