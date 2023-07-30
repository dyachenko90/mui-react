import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import snackbarSlice from "./snackbarSlice"
import authSlice from "./authSlice";

  


export const store = configureStore({

    reducer: {
        cart: cartSlice,
        product: productSlice,
        snackbar: snackbarSlice,
        auth: authSlice
    }
});