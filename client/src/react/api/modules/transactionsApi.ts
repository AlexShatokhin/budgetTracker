import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { TransactionClientType } from "../../types/TransactionType";
import { TransactionServerResponse } from "../../types/TransactionServerResponse";


export const transactionsApi = createApi({
    reducerPath: "transactionsApi",
    baseQuery,
    tagTypes: ["Transactions"],
    endpoints: (build) => ({
        addNewTransaction: build.mutation<{message: string}, TransactionClientType>({
            query: (body) => ({
                method: "POST",
                url: "/transactions",
                body
            }),
            invalidatesTags:  ["Transactions"],
        }),
        getTransactions: build.query<TransactionServerResponse, {start: string, end: string}>({
            query: (time) => `/transactions?from=${time.start}&to=${time.end}`,
            providesTags: ["Transactions"],
        })
    })
})

export const {
    useAddNewTransactionMutation,
    useGetTransactionsQuery
} = transactionsApi