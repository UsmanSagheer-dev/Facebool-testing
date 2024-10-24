import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Box, Dialog, DialogContent, Typography, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import HomeIcon from "@mui/icons-material/Home";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GamesIcon from "@mui/icons-material/SportsEsports";
import GridIcon from "@mui/icons-material/GridView";
import BadgeVisibility from "../billicon/BadgeVisibility";
import { Images } from "../../assets/images/images";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: "250px",
  border: "1px solid black",
  borderRadius: "25px",
  "@media (max-width: 950px)": {
    width: "40px",
    borderRadius: "50%",
    marginLeft: "15px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
  "@media (max-width: 950px)": {
    marginLeft: 0,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchItems = [
    { name: "AL HASSAN HIGHER SECONDARY SCHOOL", newMessages: "3 new" },
    { name: "TechloSet Solutions", newMessages: null },
    { name: "Muhammad Basit", newMessages: null },
    { name: "Pir Syed Ahmad Raza Shah Bukhari", newMessages: "9+ new" },
    { name: "Malik Munir Dinah", newMessages: null },
    { name: "Muhammad Taqqi", newMessages: "5 new comments" },
    { name: "Muhammad Taqqi", newMessages: "5 new comments" },
  ];

  const icons = [
    { icon: <HomeIcon sx={{ color: "#4267b2" }} />, key: "home" },
    { icon: <VideoLibraryIcon sx={{ color: "gray" }} />, key: "video" },
    { icon: <StorefrontIcon sx={{ color: "gray" }} />, key: "store" },
    { icon: <GamesIcon sx={{ color: "gray" }} />, key: "games" },
  ];

  const profileIcons = [
    { icon: <GridIcon />, key: "grid" },
    { icon: <MessageIcon />, key: "message" },
    { icon: <BadgeVisibility />, key: "badge" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderBottom: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Facebook Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            sx={{ width: 40, height: 40 }}
          />
          <Search onClick={handleOpen}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Facebook"
              inputProps={{ "aria-label": "search" }}
              readOnly
            />
          </Search>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "50px",
            flexGrow: 1,
            "@media (max-width: 690px)": {
              display: "none",
            },
          }}
        >
          {icons.map((iconItem) => (
            <IconButton key={iconItem.key} size="large" edge="end" color="inherit">
              {iconItem.icon}
            </IconButton>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: { sm: "auto", md: "15px" } }}>
          {profileIcons.map((iconItem) => (
            <IconButton key={iconItem.key} size="large" edge="end" color="inherit" sx={{backgroundColor:{sm:"none",md:'#c6c6c6'}}}>
              {iconItem.icon}
            </IconButton>
          ))}
          <IconButton sx={{ p: 0, ml: 2,width:'25px' }}>
            <Avatar alt="Profile Picture" src={Images.avatar} />
          </IconButton>
        </Box>
      </Toolbar>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            margin: "15px",
            width: {sm:"auto",lg:"400px"},
            borderRadius: "8px",
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Search Facebook
          </Typography>
          <InputBase
            fullWidth
            placeholder="Type to search..."
            sx={{
              border: "1px solid #ccc",
              borderRadius: "25px",
              padding: "10px",
              marginBottom: "20px",
            }}
          />
          <List>
            {searchItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>{item.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.newMessages ? item.newMessages : null} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
