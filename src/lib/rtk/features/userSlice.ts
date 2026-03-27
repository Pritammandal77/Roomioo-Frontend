import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userData: User | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    userData: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.userData = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;