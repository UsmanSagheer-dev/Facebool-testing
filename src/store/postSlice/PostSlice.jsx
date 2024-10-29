import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase"; 
import { doc, setDoc, collection, addDoc } from "firebase/firestore";



export const createPost = createAsyncThunk(
    "auth/createPost",
    async ({ post, image }, { rejectWithValue }) => {
      try {
        // Retrieve the user data from local storage
        const user = JSON.parse(localStorage.getItem("user"));
  
        if (!user || !user.uid) {
          throw new Error("User not found or UID is missing");
        }
  
        // Reference paths should match your intended Firestore structure
        const userPostsCollectionRef = collection(db, "posts", user.uid, "userPosts");
  
        // Create a new document with an auto-generated ID within the userPosts collection
        const postRef = doc(userPostsCollectionRef);
  
        await setDoc(postRef, {
          userId: user.uid,
          post,
          image,
          createdAt: new Date().toISOString(), // Optional: Add timestamp
        });
  
        return {
          postId: postRef.id,
          userId: user.uid,
          post,
          image,
        };
      } catch (error) {
        console.error("Error during upload:", error);
        return rejectWithValue(error.message);
      }
    }
  );

// export const createPost = createAsyncThunk(
//   "auth/createPost",
//   async ({  post, image }, { rejectWithValue }) => {
//     console.log("🚀 ~ image:", image)
//     console.log("🚀 ~ post:", post)
    
//     try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         console.log("🚀 ~ user:", user)
//         await setDoc(doc(db, "posts", user.uid,"userPosts"), {
//         userId: user.uid,
//         post,
//         image,
//       });

//       return {
//         userId: user.uid,
//         post,
//         image,
//       };
//     } catch (error) {
//       console.error("Error signing up or saving data to Firestore:", error); // Log detailed error
//       return rejectWithValue(error.message);
//     }
//   }
// );


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
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        console.log("User signed up successfully:", action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
