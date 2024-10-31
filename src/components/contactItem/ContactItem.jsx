import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const ContactItem = ({ name, image }) => {
  return (
    <Box display="flex" alignItems="center" gap={2} padding="8px" sx={{}}>
      <Avatar alt={name} src={image} sx={{ width: 48, height: 48 }} />
      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
        {name}
      </Typography>
    </Box>
  );
};

export default ContactItem;
