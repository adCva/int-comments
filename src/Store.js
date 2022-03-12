import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./Features/userSlice";
import dataSlice from "./Features/dataSlice";
import actionSlice from "./Features/actionSlice";
import replySlice from "./Features/replySlice";
import editSlice from "./Features/editSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        comments: dataSlice,
        actions: actionSlice,
        reply: replySlice,
        edit: editSlice
    }
})