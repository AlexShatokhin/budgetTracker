import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../baseQuery'

import type { AuthenticationRequestType } from '../../types/AuthenticationRequestType'
import type { AuthenticationResponseType } from '../../types/AuthenticationResponseType'


export const authorizationApi = createApi({
    reducerPath: "authorizationApi",
    baseQuery,
    endpoints: (build) => ({
        userRegistration: build.mutation<AuthenticationResponseType, AuthenticationRequestType>({
            query: (body) => ({
                method: "POST",
                url: "/register",
                body
            })
        }),
        userAuthorization: build.query<AuthenticationResponseType, AuthenticationRequestType>({
            query: (body) => ({
                url: `/login?email=${body.email}&password=${body.password}`,
                method: "GET",
            })
        })
    }),
})

export const {
    useUserRegistrationMutation,
    useLazyUserAuthorizationQuery
} = authorizationApi
