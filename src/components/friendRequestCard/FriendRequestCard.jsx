import React from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const FriendRequestCard = ({ name, mutualFriends, profilePic }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "16px",
        maxWidth: "90%",
        backgroundColor: "transparent",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar
          src={profilePic}
          alt={name}
          sx={{ width: 56, height: 56, marginRight: "25px" }}
        />

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mutualFriends} mutual friends
          </Typography>
        </Box>
      </Box>

      <CardActions
        sx={{ display: "flex", justifyContent: "center", marginLeft: "24px" }}
      >
        <Button variant="contained" color="primary" size="small">
          Confirm
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ marginLeft: "8px" }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default FriendRequestCard;
