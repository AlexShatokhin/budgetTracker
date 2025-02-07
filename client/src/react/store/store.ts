import { configureStore } from "@reduxjs/toolkit";
import { authorizationApi } from "../api/modules/authorizationApi";
import authorizationSlice from "../pages/Authorization/authorizationSlice"

const store = configureStore({
    reducer: {
        [authorizationApi.reducerPath]: authorizationApi.reducer,
        authorization: authorizationSlice
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authorizationApi.middleware)
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;