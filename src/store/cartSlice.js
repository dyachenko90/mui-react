import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        cart: [], 
        isOpen: false
    },
    
    reducers: {
        openCart: (state) => {
            state.isOpen = true
        },
        closeCart: (state) => {
            state.isOpen = false
        },
        clearCart: (state) => {
            state.cart = [];
        },
        setOrder: (state, action) => {
            state.cart.push(action.payload)
        },
        removeFromOrder: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload)
        },
        changeQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
            state.cart = [...state.cart];
        },
    }
})



export const { openCart, closeCart, setOrder, removeFromOrder, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

