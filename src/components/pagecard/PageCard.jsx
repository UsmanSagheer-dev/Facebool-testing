import React from 'react';
import { Card, CardContent, Avatar, Typography, Box, Stack, IconButton } from '@mui/material';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupsIcon from '@mui/icons-material/Groups';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Import the three dots icon
import FriendRequestCard from '../friendRequestCard/FriendRequestCard'
const PageCard = () => {
  return (
    <>
 <Box>
 <Box>
    <Card sx={{ width: '90%', padding: 2,backgroundColor:"transparent"}}>

      {/* Title with Groups Icon */}
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} mt={2}>
      
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Your Pages and profiles
        </Typography>
        <IconButton
        size="small"
      >
        <MoreHorizIcon />
      </IconButton>
      </Box>
      
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        {/* Profile Avatar */}
        <Avatar
          alt="Page Profile"
          src="#" // Replace with the actual path or URL to your profile image
          sx={{ width: 48, height: 48 }}
        />
        <Typography variant="body1">umat a musalimh</Typography>
      </Stack>
      
      <CardContent sx={{ padding: 0, paddingTop: 2 }}>
        {/* Actions */}
        <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer', mt: 1 }}>
          <IconButton size="small" color="primary">
            <SwitchAccountIcon />
          </IconButton>
          <Typography variant="body2">Switch to Page</Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer', mt: 1 }}>
          <IconButton size="small" color="primary">
            <CampaignIcon />
          </IconButton>
          <Typography variant="body2">Create promotion</Typography>
        </Box>
      </CardContent>
    </Card>
    </Box>
    <Box>
    <FriendRequestCard
        name="Inooct Mebers Inooct Malik"
        mutualFriends={9}
        profilePic="https://via.placeholder.com/56" // Replace with actual image URL if available
      />
    </Box>
    </Box>
    </>
  );
};

export default PageCard;
