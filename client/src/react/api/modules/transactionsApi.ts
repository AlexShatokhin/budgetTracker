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
        }),
        getLatestTransactions: build.query<TransactionServerResponse, number>({
            query: (limit) => `/transactions/latest?limit=${limit}`,
            providesTags: ["Transactions"],
        }),
        getMonthlyTransactions: build.query<{message: string, result: {month: string, income: number, expenses: number}[]}, void>({
            query: () => `/transactions/monthly`,
            providesTags: ["Transactions"],
        })
    })
})

export const {
    useAddNewTransactionMutation,
    useGetTransactionsQuery,
    useGetLatestTransactionsQuery,
    useGetMonthlyTransactionsQuery
} = transactionsApi