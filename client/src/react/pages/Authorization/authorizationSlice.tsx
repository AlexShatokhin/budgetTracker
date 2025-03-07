import { createSlice } from "@reduxjs/toolkit";


const authorizationSlice = createSlice({
    name: "authorization",
    initialState: {
        email: "",
        isAuth: false
    },
    reducers: {
        setToken(state, action) {
            state.email = action.payload.email;
            state.isAuth = localStorage.getItem("token") ? true : false;
        },
        removeToken(state) {
            state.email = "";
            state.isAuth = false;
        }
    }   
})

const { actions, reducer } = authorizationSlice;
export default reducer;

export const { setToken, removeToken } = actions;