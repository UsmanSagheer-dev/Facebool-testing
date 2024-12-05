import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  setPosts,
  selectPosts,
} from "../../store/slices/PostSlice";
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
  Divider,
} from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MovieIcon from "@mui/icons-material/Movie";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { selectUser } from "../../store/authSlice/authslice";
import { styles } from "./poststyle";
import ButtonGroup from "../buttonGroup/ButtonGroup";

export default function PostCard() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState("");
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
    setDescription("");
    setFileType("");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFileType(selectedFile.type || "");
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
    if (!user) {
      alert("Please log in to create a post.");
      return;
    }

    if (!description) {
      return;
    }

    let fileURL = null;
    if (file) {
      const storageRef = ref(storage, `posts/${file.name}`);
      await uploadBytes(storageRef, file);
      fileURL = await getDownloadURL(storageRef);
      console.log("🚀 ~ handlePost ~ storageRef:", storageRef)
    }

    const newPost = {
      name: user.displayName || "User",
      description,
      filePreview: fileURL || "",
      fileType: fileType || "",
      timestamp: new Date().toLocaleString(),
      userId: user.uid,
    };

    try {
      const postCollection = collection(db, "posts");
      const docRef = await addDoc(postCollection, newPost); 
      newPost.id = docRef.id;

      // Immediately update the local state with the new post
      dispatch(addPost(newPost)); // This will update the Redux state
      handleClose(); // Close the dialog
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleMenuClick = (event, post) => {
    if (post.userId === user?.uid) {
      setAnchorEl(event.currentTarget);
      setPostToDelete(post);
    } else {
      alert("You can only delete your own posts.");
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setPostToDelete(null);
  };

  const handleDeletePost = async () => {
    if (postToDelete) {
      try {
        await deleteDoc(doc(db, "posts", postToDelete.id));
        dispatch(setPosts(posts.filter((post) => post.id !== postToDelete.id)));
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
              {fileType && fileType.startsWith("image/") ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              ) : fileType && fileType.startsWith("video/") ? (
                <video
                  controls
                  src={filePreview}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              ) : null}
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
              {post.userId === user?.uid && (
                <IconButton onClick={(event) => handleMenuClick(event, post)}>
                  <MoreVertIcon />
                </IconButton>
              )}
            </Box>
            <Divider />
            <Typography variant="body1" sx={{ mt: 1 }}>
              {post.description}
            </Typography>
            <Divider />
            {post.filePreview && (
              <Box sx={{ mt: 1 }}>
                {post.fileType && post.fileType.startsWith("image/") ? (
                  <img
                    src={post.filePreview}
                    alt="Post content"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                ) : post.fileType && post.fileType.startsWith("video/") ? (
                  <video
                    controls
                    src={post.filePreview}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                ) : null}
              </Box>
            )}
            <Divider />
            <Box>
              <ButtonGroup />
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
            </Menu>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
