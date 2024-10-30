// src/store/authSlice/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Auth, db } from "../../config/firebase"; 
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;
      
    
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        email: user.email,
        displayName: `${firstName} ${lastName}`,
      });

      return {
        uid: user.uid,
        firstName,
        lastName,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      console.error("Error signing up or saving data to Firestore:", error);
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectUser = (state) => state.auth.user;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
