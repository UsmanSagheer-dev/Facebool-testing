import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice/authslice';
import postReducer from './slices/PostSlice'
const store = configureStore({
  reducer: {
    auth: authReducer, 
    posts: postReducer,
  },
});


export default store;
