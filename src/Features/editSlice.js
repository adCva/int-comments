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
      startEdit: (state, action) => {
        state.edit = true;
        state.editId = action.payload.id;
        state.nestedEdit = action.payload.isNested;
        state.nestedCommentId = action.payload.nestedComId;
      },
      startSimpleEdit : (state, action) => {
        state.edit = true;
        state.editId = action.payload.id;
      },
      endEdit: state => {
        state.edit = false;
        state.editId = null;
        state.nestedEdit = false;
        state.nestedCommentId = null;
        state.textToBeEdited = "";
      }
    }
})


export const { startEdit, startSimpleEdit, endEdit } = editSlice.actions;

export default editSlice.reducer;