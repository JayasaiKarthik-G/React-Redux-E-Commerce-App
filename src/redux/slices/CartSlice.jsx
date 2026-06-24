import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const saveCart = (items) => {

    const user =
        JSON.parse(localStorage.getItem("user"));

    if (user) {
        localStorage.setItem(
            `cart_${user.id}`,
            JSON.stringify(items)
        );
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {

        loadCart: (state, action) => {

            state.items =
                JSON.parse(
                    localStorage.getItem(
                        `cart_${action.payload}`
                    )
                ) || [];
        },

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

            saveCart(state.items);
        },

        removeFromCart: (state, action) => {

            state.items = state.items.filter(
                item => item.id !== action.payload
            );

            saveCart(state.items);
        },

        increaseQty: (state, action) => {

            const item = state.items.find(
                item => item.id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }

            saveCart(state.items);
        },

        decreaseQty: (state, action) => {

            const item = state.items.find(
                item => item.id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }

            saveCart(state.items);
        },

        clearCart: (state) => {

            state.items = [];

            const user =
                JSON.parse(localStorage.getItem("user"));

            if (user) {
                localStorage.removeItem(
                    `cart_${user.id}`
                );
            }
        }
    }
});

export const {
    loadCart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;