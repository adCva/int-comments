import { createSlice } from '@reduxjs/toolkit';

export const replySlice = createSlice({
    name: "replySlice",
    initialState: {
        replyId: null,
        nestedReplyId: null,
        replyTo: "",
        purpose: null,
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
      }
    }
})


export const { startReply, endReply } = replySlice.actions;

export default replySlice.reducer;