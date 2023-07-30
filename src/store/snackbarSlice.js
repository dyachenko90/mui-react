import { createSlice } from '@reduxjs/toolkit';


const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: { 
        isOpenSnack: false,
        message: '', 
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        openSnackbar: (state) => {
            state.isOpenSnack = true
        },
        closeSnackbar: (state) => {
            state.isOpenSnack = false
        },
    }
})

export const { openSnackbar, closeSnackbar, setMessage } = snackbarSlice.actions;
export default snackbarSlice.reducer;