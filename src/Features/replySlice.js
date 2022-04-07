import { createSlice } from '@reduxjs/toolkit';

export const replySlice = createSlice({
    name: "replySlice",
    initialState: {
        replyId: null,
        nestedReplyId: null,
        replyTo: "",
        purpose: null,
        replyText: ""
    },

    reducers: {
      startReply: (state, action) => {
        state.replyId = action.payload.id;
        state.nestedReplyId = action.payload.nestedId;
        state.replyTo = action.payload.user;
        state.purpose = action.payload.replyPurpose;
      },
      endReply: state => {
        state.replyId = null;
        state.nestedReplyId = null;
        state.replyTo = "";
        state.purpose = null;
        state.replyText = "";
      },
      updateText: (state, action) => {
        state.replyText = action.payload.newText;
      }
    }
})


export const { startReply, endReply, updateText } = replySlice.actions;

export default replySlice.reducer;