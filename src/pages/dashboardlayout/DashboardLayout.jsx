import { Box } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import PostCard from "../../components/postCard/PostCard";
import StoriesSlider from "../../components/storiesSlider/StoriesSlider";
import MenuList from "../../components/menuitem/Menuitem";
import MenuItem2 from "../../components/menuitem2/Menuitem2";

export default function DashboardLayout() {
  const styles = {
    lineHeight: "10px",
    fontSize: "35px",
    fontFamily: "Helvetica",
  };

  return (
    <Box sx={{ backgroundColor: "#d6dadb" }}>
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
        <Box
          sx={{
            display: { md: "flex" },
            flexDirection: "column",
            width: "24%",
            backgroundColor: "#d6dadb",
            overflowY: "scroll",
            padding: "20px",
            "&::-webkit-scrollbar": { width: "8px", opacity: 0 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
            },
            "&:hover::-webkit-scrollbar": { opacity: 1 },
            scrollbarWidth: "none",
            "&:hover": { scrollbarWidth: "thin" },
            "@media (max-width: 900px)": { display: "none" },
          }}
        >
          <MenuList />
        </Box>

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
            scrollbarWidth: "none", 
            "&::-webkit-scrollbar": { width: "0px" },
            "&:hover": {
              "&::-webkit-scrollbar": { width: "8px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
            },
            "@media (max-width: 800px)": { width: "100%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              width: "100%",
              alignItems: "center",
            }}
          >
            <StoriesSlider />
          </Box>
          <Box
            sx={{
              marginBottom: "20px",
              backgroundColor: "transparent",
              width: "100%",
            }}
          >
            <PostCard />
          </Box>
        </Box>

        <Box
          sx={{
            display: { md: "flex" },
            flexDirection: "column",
            width: "24%",
            backgroundColor: "#d6dadb",
            overflowY: "scroll",
            padding: "20px",

            "&::-webkit-scrollbar": { display: "none" },

            scrollbarWidth: "none",
            "@media (max-width: 800px)": { display: "none" },
          }}
        >
          <MenuItem2 />
        </Box>
      </Box>
    </Box>
  );
}
