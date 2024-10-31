import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ContactsHeader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="16px"
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Contacts
      </Typography>
      <Box>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ContactsHeader;
