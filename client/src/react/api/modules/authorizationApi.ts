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
                url: "auth/register",
                body
            })
        }),
    }),
})

export const {
    useUserRegistrationMutation
} = authorizationApi
