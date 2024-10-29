import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice/authslice';
import postReducer from '../store/postSlice/PostSlice'
const store = configureStore({
  reducer: {
    auth: authReducer, 
    post: postReducer,  // Add post reducer here
  },
});


export default store;
