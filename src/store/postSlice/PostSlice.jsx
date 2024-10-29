import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload); 
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
});

export const selectPosts = (state) => state.posts.posts;
export const { addPost, setPosts, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
