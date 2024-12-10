export  const styles = {
    container: {
      width: "100%",
      maxWidth: { xs: "90%", md: "700px" },
      margin: "0 auto",
    },
    inputSection: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "1px 1px 2px 2px rgba(0, 0, 0, 0.1)",
      padding: "15px",
      mb: 4,
      gap: "10px",
      
    },
    avatar: {
      width: 40,
      height: 40,
      mr: 2,
    },
    textField: {
      backgroundColor: "#f0f2f5",
      borderRadius: "20px",
      "& fieldset": { border: "none" },
    },
    dialogTitle: {
      position: "absolute",
      right: 8,
      top: 8,
    },
    postContainer: {

      borderRadius: "8px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
   height:"100px"
    },
    postBox: {
      mb: 3,
      p: 2,
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    },
    postImage: {
      width: "100%",
      borderRadius: "8px",
      marginTop: "10px",
    },
    actionIcons: {
      color: "#3b5998",
      cursor: "pointer",
      margin: "0 8px",
      cursor:'pointer',
    },
    reactionSection:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
    }
  };