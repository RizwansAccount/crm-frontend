import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'SnackBarReducer',
    initialState: {
        message: null
    },
    reducers: {
        setSnackBarMessage: (state, action) => {
            state.message = action.payload;
        },
        hideSnackBarMessage: (state) => {
            state.message = null;
        },
    },
});

export const { setSnackBarMessage, hideSnackBarMessage } = slice.actions;

export const snackBarMessageSelector = (state) => state.SnackBarReducer.message;

export default slice.reducer;