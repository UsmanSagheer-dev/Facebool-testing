import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile 
} from "firebase/auth";
import { Auth, db } from "../../config/firebase"; 
import { doc, setDoc } from "firebase/firestore";

const loginUser = createAsyncThunk(
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
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const signupUser = createAsyncThunk(
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
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await signOut(Auth);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
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
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const initializeUser = (dispatch) => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    dispatch(setUser(JSON.parse(storedUser)));
  }

  onAuthStateChanged(Auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || "",
      };
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      dispatch(logout());
      localStorage.removeItem("user");
    }
  });
};

const getErrorMessage = (error) => {
  return error.code === 'auth/user-not-found'
    ? 'User not found'
    : error.code === 'auth/wrong-password'
    ? 'Incorrect password'
    : error.message || 'An error occurred';
};

export const selectUser = (state) => state.auth.user;

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

export { loginUser, signupUser, logoutUser };
