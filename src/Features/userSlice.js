import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        activeUser: {
            username: "juliusomo",
            image: "./images/avatars/image-juliusomo.png"
        }
    }
})


export default userSlice.reducer;