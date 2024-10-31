
import React from 'react';
import { Box, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';

const ButtonGroup = ({ styles }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: 'space-between', mt: 2 }}>
      <Button startIcon={<ThumbUpIcon />} >
        Like
      </Button>
      <Button startIcon={<CommentIcon />} >
        Comment
      </Button>
      <Button startIcon={<ShareIcon />} >
        Share
      </Button>
    </Box>
  );
};

export default ButtonGroup;
