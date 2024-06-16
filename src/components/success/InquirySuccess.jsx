import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function InquirySuccess() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginY: "8rem",
        }}
      >
        <Paper sx={{ padding: "2rem" }} elevation={3}>
          <Typography gutterBottom variant="h6">
            Your Query is sent Successfully
          </Typography>
          <Typography gutterBottom variant="body1">
            Our Agent will contact you within 24 working hours
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button onClick={handleClick} variant="contained">
              Go To Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default InquirySuccess;
