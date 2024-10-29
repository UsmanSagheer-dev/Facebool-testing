// postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [], // Ensure this is defined as an array
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((_, index) => index !== action.payload);
    },
  },
});

export const { createPost, deletePost } = postSlice.actions;

export default postSlice.reducer;
