import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';

export const SocialPost = ({ post }) => {
  return (
    <Card sx={{ maxWidth: 1000, margin: '20px auto' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user-avatar">
            {post.userName[0]} {/* Display first letter of user name */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.userName}
        subheader={post.date}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like post">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share post">
          <ShareIcon />
        </IconButton>
        <Button size="small" color="primary">
          Comment
        </Button>
      </CardActions>
    </Card>
  );
};
