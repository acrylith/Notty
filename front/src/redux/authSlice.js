import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onInit: (state) => {
            const token = localStorage.getItem('token')
            if(token) {
                state.token = token
                state.isLoggedIn = true
            }
        },
        logIn: (state, action) => {
            state.token = action.payload
            state.isLoggedIn = true
        },
        logOut: (state) => {
            localStorage.clear()
            state.token = null
            state.isLoggedIn = false
        }
    }
})

export const { onInit, logIn, logOut } = authSlice.actions

export default authSlice.reducer