import React from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MovieIcon from "@mui/icons-material/Movie";

export default function PostCard() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "90%", md: "700px" },
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "1px 1px 2px 2px rgba(0, 0, 0, 0.1)",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
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
          placeholder="What's on your mind, Muhammad?"
          variant="outlined"
          size="small"
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
  );
}
