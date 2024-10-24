import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice/authslice'; // Make sure the path to your slice is correct

const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

// Export the store as a default export
export default store;
