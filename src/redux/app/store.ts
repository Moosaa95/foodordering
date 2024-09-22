// import {configureStore} from "@reduxjs/toolkit"
// import { apiSlice } from "../services/apiSlice"
// import authReducer from "../features/auth/authSlice"

// export const makeStore = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authReducer
//     },
//     middleware: getDefaultMiddleWare => getDefaultMiddleWare().concat(apiSlice.middleware),
//     devTools: process.env.NODE_ENV !== "production"
// })


// export type AppStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<typeof makeStore.getState>
// export type AppDispatch = typeof makeStore.dispatch

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authReducer from "../features/auth/authSlice";

export const makeStore = () => configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
