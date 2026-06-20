import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import userReducer from "./slices/UserSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
});