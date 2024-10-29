import React, { useState, useEffect } from "react";
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
  Divider,
} from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MovieIcon from "@mui/icons-material/Movie";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

export default function PostCard() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Muhammad Usman");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setFilePreview(null);
  };


  // handlePost function for saving a new post
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result); // Save base64 string as preview
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };
  
  const handlePost = () => {
    const newPost = {
      name,
      description,
      filePreview, // Store base64 string instead of object URL
      timestamp: new Date().toLocaleString(),
    };
  
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  
    // Reset fields
    setDescription("");
    setFile(null);
    setFilePreview(null);
    setOpen(false);
  };
  


  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "90%", md: "700px" },
        margin: "0 auto",

      }}
    >
      {/* Input Form Section */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "1px 1px 2px 2px rgba(0, 0, 0, 0.1)",
          padding: "15px",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            alt="Profile Picture"
            src="https://via.placeholder.com/150"
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <TextField
            fullWidth
            placeholder="What's on your mind, "
            variant="outlined"
            size="small"
            onClick={handleClickOpen}
            sx={{
              backgroundColor: "#f0f2f5",
              borderRadius: "20px",
              "& fieldset": { border: "none" },
            }}
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
          <Button startIcon={<VideoCameraFrontIcon />} sx={{ color: "#f02849" }}>
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

      {/* Post Creation Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Create Post
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

      {/* Posts Section */}
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          p: 2,
        }}
      >
        {posts.map((post, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              p: 2,
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                alt="Profile Picture"
                src="https://via.placeholder.com/150"
                sx={{ width: 40, height: 40, mr: 2 }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {post.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.timestamp}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {post.description}
            </Typography>
            {post.filePreview && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={post.filePreview}
                  alt="Uploaded File"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Box>
            )}
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor:"white",
              }}
            >
              <Button startIcon={<ThumbUpIcon />} color="primary">
                Like
              </Button>
              <Button startIcon={<CommentIcon />} color="primary">
                Comment
              </Button>
              <Button startIcon={<ShareIcon />} color="primary">
                Share
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
