import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import CampaignIcon from "@mui/icons-material/Campaign";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FriendRequestCard from "../friendRequestCard/FriendRequestCard";
import ContactsHeader from "../contectsHeader/ContectHeader";
import ContactItem from "../contactItem/ContactItem";

const PageCard = () => {
  const item = [
    {
      name: "Usman",
      image: "images",
    },
    {
      name: "Ali",
      image: "images",
    },
    {
      name: "Mufti",
      image: "images",
    },
    {
      name: "Ayesha",
      image: "images",
    },
    {
      name: "Sara",
      image: "images",
    },
    {
      name: "Ahmed",
      image: "images",
    },
  ];

  return (
    <Box>
      <Card sx={{ width: "90%", padding: 2, backgroundColor: "transparent" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          mt={2}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Your Pages and Profiles
          </Typography>
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        </Box>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Avatar alt="Page Profile" src="#" sx={{ width: 48, height: 48 }} />
          <Typography variant="body1">umat a musalimh</Typography>
        </Stack>

        <CardContent sx={{ padding: 0, paddingTop: 2 }}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer", mt: 1 }}
          >
            <IconButton size="small" color="primary">
              <SwitchAccountIcon />
            </IconButton>
            <Typography variant="body2">Switch to Page</Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer", mt: 1 }}
          >
            <IconButton size="small" color="primary">
              <CampaignIcon />
            </IconButton>
            <Typography variant="body2">Create Promotion</Typography>
          </Box>
        </CardContent>
      </Card>
      <Divider />

      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 0 }}>
            Friend Requests
          </Typography>
          <Typography>See all</Typography>
        </Box>
        <Box>
          <FriendRequestCard
            name="Inooct Mebers Inooct Malik"
            mutualFriends={9}
            profilePic="https://via.placeholder.com/56"
          />
        </Box>
      </Box>

      <Box>
        <ContactsHeader />
      </Box>

      <Box>
        {item.map((item, index) => (
          <ContactItem key={index} name={item.name} image={item.image} />
        ))}
      </Box>
    </Box>
  );
};

export default PageCard;
