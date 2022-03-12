import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "dataSlice",
    initialState: {
        activeUser: {
            username: "juliusomo",
            image: "./images/avatars/image-juliusomo.png"
        }
    },

    reducers: {}
})


export const {} = userSlice.actions;

export default userSlice.reducer;