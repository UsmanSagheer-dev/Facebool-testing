export const styles = {
    appBar: {
      backgroundColor: "#fff",
      color: "#000",
      borderBottom: "1px solid #ccc",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    toolbar: {
      justifyContent: "space-between",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      width: 40,
      height: 40,
    },
    searchContainer: {
      marginLeft: "15px",
      width: "250px",
      border: "1px solid black",
      borderRadius: "25px",
      "@media (max-width: 950px)": {
        width: "40px",
        borderRadius: "50%",
      },
    },
    iconsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "50px",
      flexGrow: 1,
      "@media (max-width: 690px)": {
        display: "none",
      },
    },
    profileContainer: {
      display: "flex",
      alignItems: "center",
      gap: { sm: "auto", md: "15px" },
    },
    iconButton: {
      backgroundColor: { sm: "none", md: "#c6c6c6" },
    },
    dialogSearch: {
      position: "absolute",
      top: 0,
      left: 0,
      margin: "15px",
      width: "400px",
      borderRadius: "8px",
    },
    dialogProfileMenu: {
      position: "absolute",
      top: 30,
      right: 15,
      width: "200px",
      borderRadius: "8px",
    },
  };