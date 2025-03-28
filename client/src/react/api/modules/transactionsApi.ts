import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { TransactionClientType } from "../../types/TransactionType";
import { TransactionServerResponse } from "../../types/TransactionServerResponse";
import { AmountType } from "../../types/amountType";


export const transactionsApi = createApi({
    reducerPath: "transactionsApi",
    baseQuery,
    tagTypes: ["Transactions", "Categories"],
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
        }),

        getTransactionCategories: build.query<{message: string, result: {name: string, id: string, type: AmountType}[]}, void>({
            query: () => `/categories`,
            providesTags: ["Categories"],
        }),
    })
})

export const {
    useAddNewTransactionMutation,
    useGetTransactionCategoriesQuery,
    useGetTransactionsQuery,
    useGetLatestTransactionsQuery,
    useGetMonthlyTransactionsQuery
} = transactionsApi