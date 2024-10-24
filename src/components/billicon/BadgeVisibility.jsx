import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function BadgeVisibility() {
  const [count, setCount] = React.useState(0); 

 
  const handleNotificationClick = () => {
    setCount(count + 1); 
  };

  return (
    <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      width:"25px",
      height:"25px",
      }}
    >
      
      <Badge color="secondary" badgeContent={count}>
       
        <NotificationsIcon
          fontSize="large" 
          onClick={handleNotificationClick} 
          style={{ cursor: 'pointer' }} 
        />
      </Badge>
    </Box>
  );
}
