import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore'; // Import doc and getDoc from firebase/firestore

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async ({ userId }, { rejectWithValue }) => {
    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId); // Create document reference
        const docSnapshot = await getDoc(userDocRef); // Get document snapshot

        if (docSnapshot.exists()) {
          return docSnapshot.data(); // Return user data
        } else {
          return rejectWithValue("No user found.");
        }
      } catch (error) {
        return rejectWithValue("Failed to fetch user data.");
      }
    } else {
      return rejectWithValue("No user is currently logged in.");
    }
  }
);

// Initial state for the userSlice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,  // Initially, there is no user
    loginError: null,  // No login error by default
    isAuthenticated: false,  // By default, the user is not authenticated
  },
  reducers: {
    clearUser(state) {
      state.user = null;
      state.loginError = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;  // Store the fetched user data in the state
        state.isAuthenticated = true;  // Set isAuthenticated to true
        state.loginError = null;  // Clear any login errors
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loginError = action.payload;  // If fetching the user fails, store the error in loginError
      });
  },
});

// Action to clear the user data (can be used for logging out)
export const { clearUser } = userSlice.actions;

// Selector to get the user data from the state
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
