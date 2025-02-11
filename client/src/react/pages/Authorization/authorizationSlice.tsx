import { createSlice } from "@reduxjs/toolkit";


const authorizationSlice = createSlice({
    name: "authorization",
    initialState: {
        token: "",
        isAuth: false
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            state.isAuth = true;
            sessionStorage.setItem("user", action.payload);
        },
        removeToken(state) {
            state.token = "";
            state.isAuth = false;
            sessionStorage.removeItem("user");
        }
    }   
})

const { actions, reducer } = authorizationSlice;
export default reducer;

export const { setToken, removeToken } = actions;