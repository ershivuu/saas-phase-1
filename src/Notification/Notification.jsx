import React from "react";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


function Notification({ open, handleClose, alertMessage, alertSeverity }) {
  alertSeverity = alertSeverity ? alertSeverity : "default";
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }} 
      // sx={{ width: "25%" }}
      sx={{
        width: "25%",
        marginTop: "3.5em",
        "@media (max-width: 600px)": { 
          width: "95%", 
          maxWidth: "95%" 
        }
      }}
      variant="filled"
      TransitionComponent={Slide}
    >
      <Alert
        onClose={handleClose}
        severity={alertSeverity}
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
