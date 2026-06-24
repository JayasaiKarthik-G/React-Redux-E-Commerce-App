import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },

        deleteAccount: (state) => {

            const currentUser = state.user;

            if (!currentUser) return;

            const users =
                JSON.parse(localStorage.getItem("users")) || [];

            const updatedUsers = users.filter(
                user => user.id !== currentUser.id
            );

            localStorage.setItem(
                "users",
                JSON.stringify(updatedUsers)
            );

            localStorage.removeItem(
                `cart_${currentUser.id}`
            );

            localStorage.removeItem("user");

            state.user = null;
        }
    }
});

export const {
    login,
    logout,
    deleteAccount
} = userSlice.actions;

export default userSlice.reducer;