import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {

            const item = state.items.find(
                p => p.id === action.payload.id
            );

            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        removeFromCart: (state, action) => {

            state.items = state.items.filter(
                item => item.id !== action.payload
            );

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        increaseQty: (state, action) => {

            const item = state.items.find(
                i => i.id === action.payload
            );

            if (item) item.quantity += 1;

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        decreaseQty: (state, action) => {

            const item = state.items.find(
                i => i.id === action.payload
            );

            if (item && item.quantity > 1) item.quantity -= 1;

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cart");
        }

    }
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;