import { createSlice } from '@reduxjs/toolkit';

export const editSlice = createSlice({
    name: "editSlice",
    initialState: {
        edit: false,
        editId: null,
        nestedEdit: false,
        nestedCommentId: null,
        textToBeEdited: ""
    },

    reducers: {
      startEdit : (state, action) => {
        state.edit = true;
        state.editId = action.payload.id;
      },
      startNestedEdit : (state, action) => {
        state.edit = false;
        state.editId = action.payload.id;
        state.nestedEdit = action.payload.isNested;
        state.nestedCommentId = action.payload.nestedComId;
      },
      endEdit: (state) => {
        state.edit = false;
        state.editId = null;
        state.nestedEdit = false;
        state.nestedCommentId = null;
      }
    }
})


export const { startEdit, startNestedEdit, endEdit } = editSlice.actions;

export default editSlice.reducer;