import { createSlice } from '@reduxjs/toolkit';

export const actionSlice = createSlice({
    name: "actionSlice",
    initialState: {
        reply: false,
        replyId: null,
        replyTo: "",
        edit: false,
        editId: null,
        nestedEdit: false,
        nestedCommentId: null
    },

    reducers: {
      startReply: (state, action) => {
        state.reply = true;
        state.replyId = action.payload.id;
        state.replyTo = action.payload.user;
      },
      endReply: state => {
        state.reply = false;
        state.replyId = 0;
        state.replyTo = "";
      },
      startEdit: (state, action) => {
        console.log("start");
        state.edit = true;
        state.editId = action.payload.id;
        state.nestedEdit = action.payload.isNested;
        state.nestedCommentId = action.payload.nestedComId;
      },
      endEdit: state => {
        state.edit = false;
        state.editId = null;
        state.nestedEdit = false;
        state.nestedCommentId = null;
      }
    }
})


export const { startReply, endReply, startEdit, endEdit } = actionSlice.actions;

export default actionSlice.reducer;