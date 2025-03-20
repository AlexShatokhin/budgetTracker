import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import url from "../../constants/url"

const baseQuery = fetchBaseQuery({
    baseUrl: url.BASE_URL + ":" + url.PORT + url.API,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${JSON.parse(token)}`);
        }
        return headers;
    }
});

export default baseQuery;