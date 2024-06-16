import { Dialog, DialogTitle, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import ActivateComponent from "./ActivateComponent";
import VerifyComponent from "./VerifyComponent";

export default function OtpModal({ showOtpModal, setShowOtpModal }) {
  const [content, setContent] = useState("generate");
  return (
    <Dialog open={showOtpModal} onClose={() => setShowOtpModal(false)}>
      <Typography marginY={"1rem"} align="center" variant="h6">
        Please Verify Account
      </Typography>

      <Divider />
      {content === "generate" && <ActivateComponent setContent={setContent} />}
      {content === "verify" && (
        <VerifyComponent
          setShowOtpModal={setShowOtpModal}
          setContent={setContent}
        />
      )}
    </Dialog>
  );
}
