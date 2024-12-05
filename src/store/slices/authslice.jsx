// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { Auth, db, storage } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const getErrorMessage = (error) => {
  console.error("Firebase Error:", error);
  switch (error.code) {
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/email-already-in-use":
      return "Email is already in use";
    case "auth/admin-restricted-operation":
      return "Admin operation restricted. Check your Firebase settings.";
    default:
      return error.message || "An error occurred";
  }
};

// Async thunk for login
const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user); // Debugging

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

// Async thunk for signup with image upload
const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ firstName, lastName, email, password, imageFile }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;

      console.log("User signed up:", user); // Debugging

      // Define imageUrl at the beginning
      let imageUrl = null;

      // If an image file is provided, upload it to Firebase Storage
      if (imageFile) {
        const imageRef = ref(storage, `profile_images/${user.uid}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef); // Get the download URL of the image
        console.log("Image uploaded to Firebase Storage:", imageUrl); // Debugging
      }

      // Update the user's profile with the display name and image URL
      await updateProfile(user, { displayName: `${firstName} ${lastName}`, photoURL: imageUrl });
      console.log("User profile updated:", user.displayName, user.photoURL); // Debugging

      // Store user data in Firestore along with the image URL
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        email: user.email,
        displayName: `${firstName} ${lastName}`,
        photoURL: imageUrl || "", // Store the image URL if available
      });

      return {
        uid: user.uid,
        firstName,
        lastName,
        email: user.email,
        displayName: user.displayName,
        photoURL: imageUrl || "", // Include image URL in the response
      };
    } catch (error) {
      console.error("Signup failed:", error); // Debugging
      return rejectWithValue(getErrorMessage(error)); // Enhanced error handling
    }
  }
);

// Async thunk for logout
const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await signOut(Auth);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// The authSlice with actions and reducers
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
        localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
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
        localStorage.removeItem("user"); // Clear user from localStorage
      });
  },
});

// Action to initialize user from localStorage and monitor auth state changes
export const initializeUser = (dispatch) => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    dispatch(setUser(JSON.parse(storedUser)));
  }

  // Firebase auth state observer
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || "",
      };
      dispatch(setUser(userData)); // Set user in Redux
      localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
    } else {
      dispatch(logout());
      localStorage.removeItem("user"); // Remove user from localStorage
    }
  });
};

// Selector to get the current user
export const selectUser = (state) => state.auth.user;

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

export { loginUser, signupUser, logoutUser };
