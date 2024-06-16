import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../store/UserProvider";
import { toast } from "react-toastify";

export default function ValidateOtp() {
  const navigate = useNavigate();
  const { userState: user, setUserState } = useContext(userContext);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function handleClick() {
    setIsEmpty(false);
    setOtpInvalid(false);
    if (!user) return;
    if (!otp) {
      setIsEmpty(true);
    } else {
      setIsVerifying(true);
      const response = await fetch("http://localhost:8080/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          otp: otp,
        }),
      });

      const res = await response.json();
      if (res === false) {
        setOtpInvalid(true);
      }
      setIsVerifying(false);
      if (res) {
        user.active = true;
        setUserState(user);
        toast.success("Account Verified");
        navigate("/");
      }
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginY: "7rem",
        }}
      >
        <Paper sx={{ padding: "2rem" }} elevation={3}>
          <Typography
            sx={{
              marginBottom: {
                xs: "1rem",
                sm: "2rem",
              },
            }}
            gutterBottom
            variant="body1"
          >
            The OTP was sent on your registered email
          </Typography>
          <TextField
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            type="number"
            required
            label="Enter OTP"
          />
          {otpInvalid && (
            <Typography paddingTop={1} align={"center"} sx={{ color: "red" }}>
              Please enter a valid OTP
            </Typography>
          )}
          {isEmpty && (
            <Typography paddingTop={1} align={"center"} sx={{ color: "red" }}>
              Please enter a value
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              disabled={isVerifying}
              onClick={handleClick}
              variant="contained"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
