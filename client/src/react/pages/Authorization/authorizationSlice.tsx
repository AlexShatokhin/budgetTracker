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
        },
        removeToken(state) {
            state.token = "";
            state.isAuth = false;
        }
    }   
})

const { actions, reducer } = authorizationSlice;
export default reducer;

export const { setToken, removeToken } = actions;