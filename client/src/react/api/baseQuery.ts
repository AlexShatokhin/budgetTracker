import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).authorization.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

export default baseQuery;