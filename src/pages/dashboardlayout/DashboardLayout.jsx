import { Box } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import PostCard from "../../components/postCard/PostCard";
import StoriesSlider from "../../components/storiesSlider/StoriesSlider";
import MenuList from "../../components/menuitem/Menuitem";
import FacebookCard from "../../components/facebookcard/Facebookcard";

export default function DashboardLayout() {
  const styles={
lineHeight:'10px',
    fontSize:'35px',
    fontFamily:'Helvetica',
  }
 
  return (
    <Box sx={{ backgroundColor: '#d6dadb' }}>
      <Box>
        <Navbar />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          height: "calc(100vh - 64px)",
        }}
      >
        {/* Left Sidebar */}
        <Box
          sx={{
            display: { md: "flex" },
            flexDirection: "column",
            width: "20%",
            backgroundColor: "#d6dadb",
            padding: "20px",
            "@media (max-width: 900px)": {
              display: "none",
            },
          }}
        >
          <MenuList/>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            width: "60%",
            backgroundColor: "#d6dadb",
            padding: "10px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "0px",
            },
            "&:hover": {
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
            },
            "@media (max-width: 800px)": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              marginBottom: "20px",
              backgroundColor: "transparent",
              width: "100%",
            }}
          >
            <PostCard />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              overflow: 'hidden',
              width: "100%",
              alignItems: "center",
              position: 'relative',
            }}
          >
            <StoriesSlider />
          </Box>
          <Box>
            <FacebookCard/>
          </Box>

        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            display: { md: "flex" },
            flexDirection: "column",
            width: "20%",
            backgroundColor: "#d6dadb",
            padding: "20px",
            "@media (max-width: 800px)": {
              display: "none",
            },
          }}
        >
          <p >🎉 Events</p>
          <p>📧 Messages</p>
          <p>🎂 Birthdays</p>
        </Box>
      </Box>
    </Box>
  );
}
