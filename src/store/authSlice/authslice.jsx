import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { Auth, db } from "../../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// AsyncThunk to login a user
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

// AsyncThunk to sign up a user
const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ firstName, lastName, email, password, photoURL }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;

      // Update the user's profile with display name and photo URL
      try {
        await updateProfile(user, { displayName: `${firstName} ${lastName}`, photoURL });
        console.log("User profile updated successfully");
      } catch (error) {
        throw new Error("Failed to update user profile: " + error.message);
      }

      // Save user data to Firestore
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          firstName,
          lastName,
          email: user.email,
          displayName: `${firstName} ${lastName}`,
          photoURL, // Save photoURL to Firestore
        });
        console.log("User data saved to Firestore");
      } catch (error) {
        throw new Error("Failed to save user data in Firestore: " + error.message);
      }

      return {
        uid: user.uid,
        firstName,
        lastName,
        email: user.email,
        displayName: `${firstName} ${lastName}`,
        photoURL, // Return photoURL
      };
    } catch (error) {
      console.error("Signup Error:", error.message);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// AsyncThunk to logout the user
const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await signOut(Auth);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});


export const validateUIDConsistency = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const firestoreUser = userSnapshot.data();
      if (firestoreUser.uid === uid) {
        return true;
      } else {
        throw new Error("UID mismatch between Authentication and Firestore.");
      }
    } else {
      throw new Error("No Firestore user found for the given UID.");
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

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

// Function to initialize user and validate UID consistency
export const initializeUser = (dispatch) => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    dispatch(setUser(JSON.parse(storedUser)));
  }

  onAuthStateChanged(Auth, async (user) => {
    if (user) {
      try {
        await validateUIDConsistency(user.uid);
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || "",
        };
        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("UID validation failed:", error.message);
        dispatch(logout());
        localStorage.removeItem("user");
      }
    } else {
      dispatch(logout());
      localStorage.removeItem("user");
    }
  });
};

// Utility function for error messages
const getErrorMessage = (error) => {
  return error.code === "auth/user-not-found"
    ? "User not found"
    : error.code === "auth/wrong-password"
    ? "Incorrect password"
    : error.message || "An error occurred";
};

// Selectors
export const selectUser = (state) => state.auth.user;

// Exports
export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
export { loginUser, signupUser, logoutUser };
