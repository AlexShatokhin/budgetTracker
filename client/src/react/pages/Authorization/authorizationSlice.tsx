import { createSlice } from "@reduxjs/toolkit";


const authorizationSlice = createSlice({
    name: "authorization",
    initialState: {
        token: "",
        email: "",
        isAuth: false
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload.token;
            state.email = action.payload.email;

            state.isAuth = true;
            sessionStorage.setItem("user", JSON.stringify(action.payload));
        },
        removeToken(state) {
            state.token = "";
            state.email = "";
            state.isAuth = false;
            sessionStorage.removeItem("user");
        }
    }   
})

const { actions, reducer } = authorizationSlice;
export default reducer;

export const { setToken, removeToken } = actions;