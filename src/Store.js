import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./Features/userSlice";
import commentSlice from "./Features/commentSlice";
import replySlice from "./Features/replySlice";
import editSlice from "./Features/editSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        comments: commentSlice,
        reply: replySlice,
        edit: editSlice
    }
})