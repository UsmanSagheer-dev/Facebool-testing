import React, { useRef } from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import { Images } from '../../assets/images/images';

const stories = [
  { name: "Create story", image: "path/to/your/create_story_image.jpg", isCreateStory: true },
  { name: "Malik Kamran", image: "path/to/image1.jpg" },
  { name: "Mudasir Sharif", image: "path/to/image2.jpg" },
  { name: "Malik Saad", image: "path/to/image3.jpg" },
  { name: "Malik Ali Altaf Khullung", image: "path/to/image4.jpg" },
  { name: "Another User", image: "path/to/image5.jpg" },
  { name: "Ali", image: "path/to/image6.jpg" },
];

export default function StoriesSlider() {
  const scrollRef = useRef(null);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 140 * 5, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -140 * 5, behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent:"center",
        alignItems: 'center',
        overflow: 'hidden',
        padding: '10px',
        position: 'relative',
        width: '100%',
        maxWidth: '740px',
        height:'200px',
        '&:hover .arrow-button': {
          opacity: 1,
        }
      }}
    >
      <IconButton
        onClick={handleScrollLeft}
        className="arrow-button"
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#fff',
          borderRadius: '50%',
          zIndex: 1,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          padding: '10px',
          width: '100%',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {stories.map((story, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 140,
              height: 210,
              backgroundColor: story.isCreateStory ? '#e7f3ff' : '#fff',
              borderRadius: '10px',
              marginRight: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 3,
              position: 'relative',
            }}
          >
            {story.isCreateStory ? (
              <Box
                sx={{
                  width: '100%',
                  height: '70%',
                  backgroundImage: `url(${Images.usman})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    position: 'absolute',
                    bottom: '-20px',
                    border: '3px solid white',
                  }}
                >
                  <AddIcon />
                </Avatar>
              </Box>
            ) : (
              <Avatar
                src={story.image}
                alt={story.name}
                sx={{ width: 60, height: 60, marginBottom: '10px', border: '3px solid #1976d2' }}
              />
            )}
            <Typography variant="body2" align="center" noWrap sx={{ marginTop: story.isCreateStory ? '40px' : '0px' }}>
              {story.name}
            </Typography>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handleScrollRight}
        className="arrow-button"
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#fff',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
