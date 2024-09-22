import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    // refresh: string;
    // token: string;
}

// Initial state with type annotation
const initialState: AuthState = {
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") || "false"),
    isLoading: true,
    // token: '',
    // refresh: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state) => {
            // setAuth: (state, action: PayloadAction<{ token: string; refresh: string }>) => {
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            // state.token = action.payload.token;
            // state.refresh = action.payload.refresh;
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            localStorage.setItem("isAuthenticated", JSON.stringify(false));
            // state.token = '';
            // state.refresh = '';
        },
        finishInitialLoad: (state) => {
            state.isLoading = false;
        }
    }
});

// Action creators are automatically generated
export const { setAuth, logOut, finishInitialLoad } = authSlice.actions;

// Reducer
export default authSlice.reducer;

export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectIsLoading = (state: any) => state.auth.isLoading;

// Selector functions
// export const selectCurrentToken = (state: RootState) => state.auth.token;
// export const selectCurrentRefresh = (state: RootState) => state.auth.refresh;
