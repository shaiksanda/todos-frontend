import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    username: null,
    role: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.username = action.payload.username
            state.role = action.payload.role
        },
        logout: (state) => {
            state.username = null;
            state.role = null;
        },
    }

})

export const { setCredentials,logout } = authSlice.actions


export default authSlice.reducer