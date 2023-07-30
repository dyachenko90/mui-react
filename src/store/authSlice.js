import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        displayName: null, 
        uid: null,
        email: null,
    },
    
    reducers: {
        logIn: (state, action) => {
            const {displayName, uid, email} = action.payload;
            state.displayName = displayName;
            state.uid = uid;
            state.email = email;
        },
        logOut: (state) => {
            state.displayName = null;
            state.uid = null;
            state.email = null;
        }
    }
})



export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;

