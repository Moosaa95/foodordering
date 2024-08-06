import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean
}

const initialState = {
    isAuthenticated: false,
    isLoading: true 
} as AuthState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: state => {
            state.isAuthenticated = true
        },
        logOut: state => {
            state.isAuthenticated = false 
        },
        finishInitialLoad: state => {
            state.isLoading = false
        }
    }
})

export const {setAuth, logOut, finishInitialLoad} = authSlice.actions
export default authSlice.reducer