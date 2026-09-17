import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./services/baseApi";
import { authSlice } from "./slices/authSlice";

export const reducer = combineReducers({
  auth: authSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
