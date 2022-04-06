import { createSlice } from '@reduxjs/toolkit';

export const deleteSlice = createSlice({
    name: "deleteSlice",
    initialState: {
        isPopUpOpened: false,
        isCommentNested: false,
        parrentId: null,
        childId: null
    },

    reducers: {
        openPopUp: (state, action) => {
            state.isPopUpOpened = true;
            state.isCommentNested = action.payload.isNested;
            state.parrentId = action.payload.mainId;
            state.childId = action.payload.secondId;
        },
        openSimplePop: (state) => {
            state.isPopUpOpened = true;
        },
        cancelDelete: (state) => {
            state.isPopUpOpened = false;
        }
    }
})


export const { openPopUp, openSimplePop, cancelDelete } = deleteSlice.actions;

export default deleteSlice.reducer;