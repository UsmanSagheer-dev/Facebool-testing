import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Button,
  CardActions,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Images } from "../../assets/images/images";
export default function FacebookCard() {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(savedComments);
  }, []);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      const newComments = [...comments, commentText];
      setComments(newComments);
      setCommentText("");
      localStorage.setItem("comments", JSON.stringify(newComments));
    }
  };

  const toggleCommentInput = () => {
    setShowCommentInput((prevShow) => !prevShow);
  };

  return (
    <Card
      sx={{ maxWidth: 720, margin: "20px auto", boxShadow: 3, height: "auto" }}
    >
      <CardHeader
        avatar={
          <Avatar
            src="https://example.com/profile-picture.jpg"
            alt="Sheraz Qaisrzai"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Usman Malik"
        subheader="18m"
      />

      <img
        src={Images.usman}
        alt="Quran Page"
        style={{ width: "100%", height: "auto" }}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Overcome stress by trusting Allah. Be positive about a better future,
          remember past successes and take action.
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: "space-around" }}>
        <Button
          startIcon={<ThumbUpAltOutlinedIcon />}
          sx={{ textTransform: "none" }}
          onClick={handleLike}
        >
          Like ({likes})
        </Button>
        <Button
          startIcon={<ChatBubbleOutlineIcon />}
          sx={{ textTransform: "none" }}
          onClick={toggleCommentInput}
        >
          Comment
        </Button>
        <Button startIcon={<SendOutlinedIcon />} sx={{ textTransform: "none" }}>
          Send
        </Button>
        <Button
          startIcon={<ShareOutlinedIcon />}
          sx={{ textTransform: "none" }}
        >
          Share
        </Button>
      </CardActions>

      {showCommentInput && (
        <CardContent>
          <TextField
            label="Write a comment..."
            fullWidth
            variant="outlined"
            size="small"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleComment}
            sx={{ mt: 1 }}
          >
            Save Comment
          </Button>
        </CardContent>
      )}

      <CardContent>
        {comments.map((comment, index) => (
          <Typography
            key={index}
            variant="body2"
            color="textSecondary"
            sx={{ mt: 1 }}
          >
            {comment}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
