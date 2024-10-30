import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  setPosts,
  selectPosts,
} from "../../store/postSlice/PostSlice";
import { db, storage } from "../../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MovieIcon from "@mui/icons-material/Movie";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { selectUser } from "../../store/authSlice/authslice";
import { styles } from "./poststyle";

export default function PostCard() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postCollection = collection(db, "posts");
        const postSnapshot = await getDocs(postCollection);
        const postData = postSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setPosts(postData));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [dispatch]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setFilePreview(null);
    setDescription(""); // Clear the description when closing
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handlePost = async () => {
    // Verify user is logged in
    if (!user) {
      console.error("User is not logged in");
      alert("Please log in to create a post.");
      return;
    }

    if (!description) {
      console.error("Description is required.");
      return;
    }

    let fileURL = null;
    if (file) {
      const storageRef = ref(storage, `posts/${file.name}`);
      await uploadBytes(storageRef, file);
      fileURL = await getDownloadURL(storageRef);
    }

    const newPost = {
      name: user.displayName || "User",
      description,
      filePreview: fileURL || filePreview || "",
      timestamp: new Date().toLocaleString(),
      userId: user.uid,
    };

    try {
      const postCollection = collection(db, "posts");
      await addDoc(postCollection, newPost);
      dispatch(addPost(newPost));
      setDescription("");
      setFile(null);
      setFilePreview(null);
      setOpen(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleMenuClick = (event, post) => {
    setAnchorEl(event.currentTarget);
    setPostToDelete(post);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setPostToDelete(null);
  };

  const handleDeletePost = async () => {
    if (postToDelete) {
      console.log("Deleting post with ID:", postToDelete.id);
      try {
        await deleteDoc(doc(db, "posts", postToDelete.id));
        dispatch(setPosts(posts.filter((post) => post.id !== postToDelete.id)));
        console.log("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting document:", error);
      }
      handleCloseMenu();
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.inputSection}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            alt="Profile Picture"
            src={user?.photoURL || "https://via.placeholder.com/150"}
            sx={styles.avatar}
          />
          <TextField
            fullWidth
            placeholder="What's on your mind, "
            variant="outlined"
            size="small"
            onClick={handleClickOpen}
            sx={styles.textField}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            borderTop: "1px solid #ccc",
            pt: 1,
          }}
        >
          <Button
            startIcon={<VideoCameraFrontIcon />}
            sx={{ color: "#f02849" }}
          >
            Live video
          </Button>
          <Button startIcon={<PhotoLibraryIcon />} sx={{ color: "#45bd62" }}>
            Photo/video
          </Button>
          <Button startIcon={<MovieIcon />} sx={{ color: "#f02849" }}>
            Reel
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Create Post
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={styles.dialogTitle}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={user ? user.displayName : ""}
            disabled
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, textTransform: "none" }}
          >
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {filePreview && (
            <Box sx={{ mt: 2 }}>
              <img
                src={filePreview}
                alt="Preview"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePost} variant="contained" color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={styles.postContainer}>
        {posts.map((post) => (
          <Box key={post.id} sx={styles.postBox}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.timestamp}
                </Typography>
              </Box>
              <IconButton onClick={(event) => handleMenuClick(event, post)}>
                <MoreVertIcon />
              </IconButton>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {post.description}
            </Typography>
            {post.filePreview && (
              <img src={post.filePreview} alt="Post" style={styles.postImage} />
            )}
            <Box
              sx={{
                display: "flex",
                mt: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 1,
                }}
              >
                <ThumbUpIcon sx={styles.actionIcons} />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
                  12
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <CommentIcon sx={styles.actionIcons} />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
                  3
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ShareIcon sx={styles.actionIcons} />
                <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
                  1
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
      </Menu>
    </Box>
  );
}
