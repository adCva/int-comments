import { createSlice } from '@reduxjs/toolkit';

export const replySlice = createSlice({
    name: "replySlice",
    initialState: {
        reply: false,
        replyId: null,
        replyTo: ""
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
      }
    }
})


export const { startReply, endReply } = replySlice.actions;

export default replySlice.reducer;