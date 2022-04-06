import { configureStore } from '@reduxjs/toolkit';
// =========== Slice components.
import userSlice from "./Features/userSlice";
import commentSlice from "./Features/commentSlice";
import replySlice from "./Features/replySlice";
import editSlice from "./Features/editSlice";
import deleteSlice from "./Features/deleteSlice";



export default configureStore({
    reducer: {
        user: userSlice,
        comments: commentSlice,
        reply: replySlice,
        edit: editSlice,
        delete: deleteSlice
    }
});