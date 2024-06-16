import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { userContext } from "../../store/UserProvider";

export default function ActivateComponent({ setContent }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { userState: user } = useContext(userContext);

  async function handleClick() {
    if (!user) return;
    setIsGenerating(true);
    const response = await fetch("http://localhost:8080/generate", {
      method: "POST",
      body: user.email,
      headers: {
        "Content-Type": "plain/text",
      },
    });
    const res = await response.json();
    setIsGenerating(false);
    if (res) setContent("verify");
  }
  return (
    <>
      <Paper sx={{ padding: "2rem" }}>
        <Typography gutterBottom variant="h6">
          Your account is currently unverified click below to verify
        </Typography>
        <Typography gutterBottom variant="body1">
          you will recieve a OTP on your registered email
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Button
            disabled={isGenerating}
            onClick={handleClick}
            variant="contained"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
