import { createSlice } from '@reduxjs/toolkit';

export const actionSlice = createSlice({
    name: "actionSlice",
    initialState: {
        reply: false,
        replyId: 0,
        replyTo: "",
        edit: false,
        editId: 0,
        editText: ""
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


export const { startReply, endReply } = actionSlice.actions;

export default actionSlice.reducer;