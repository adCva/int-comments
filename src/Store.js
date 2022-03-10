import { configureStore } from '@reduxjs/toolkit';
import dataSlice from "./Features/dataSlice";
import actionSlice from "./Features/actionSlice";

export default configureStore({
    reducer: {
        comments: dataSlice,
        actions: actionSlice
    }
})