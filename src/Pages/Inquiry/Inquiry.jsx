import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { userContext } from "../../store/UserProvider";
import AuthModal from "../../components/Modal/AuthModal";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../utility/postData";

export default function Inquiry() {
  const navigate = useNavigate();
  const { userState: user } = useContext(userContext);
  const [query, setQuery] = useState("");
  const [queryDetail, setQueryDetail] = useState("");
  const [empty, setEmpty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      toast.success("Sent Successfully");
      navigate("/inquirysuccess");
    },
    onError: () => {
      toast.error("Failed to Submit");
    },
  });

  async function handleClick() {
    setEmpty(false);
    if (!query || !queryDetail) {
      setEmpty(true);
    } else if (!user) {
      setShowModal(true);
    } else {
      // const response = await fetch("http://localhost:8080/inquiry", {
      //   method: "",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // body: JSON.stringify({
      //   email: user.email,
      //   summary: query,
      //   description: queryDetail,
      // }),
      // });
      // const res = await response.json();
      const data = {
        email: user.email,
        summary: query,
        description: queryDetail,
      };
      mutation.mutate({ url: "/inquiry", data: data });
    }
  }

  const hrStyles = {
    display: "flex",
    alignItems: "center",
    fontFamily: "sans-serif",
    width: "100%",
    margin: "15px auto",
    color: "#444",
  };

  const hrLineStyles = {
    flexGrow: 1,
    height: "1px",
    backgroundColor: "#444",
    marginRight: "10px", // Adjust as needed
    marginLeft: "10px", // Adjust as needed
  };

  const textStyles = {
    padding: "0 10px", // Adjust as needed
  };

  return (
    <>
      <div style={{ margin: "auto" }}>
        <AuthModal showModal={showModal} setShowModal={setShowModal} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginY: "3rem",
            flexDirection: "row",
          }}
        >
          <Paper
            sx={{
              padding: {
                xs: "1rem",
                sm: "2rem",
              },
            }}
            elevation={3}
          >
            <Typography
              sx={{
                marginBottom: {
                  xs: "1rem",
                  sm: "2rem",
                },
              }}
              gutterBottom
              variant="h5"
            >
              Have any doubts or questions ? Contact us
            </Typography>
            <TextField
              sx={{ marginBottom: "1.5rem" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
              required
              label="Enter Question"
            />
            <TextField
              value={queryDetail}
              onChange={(e) => setQueryDetail(e.target.value)}
              fullWidth
              required
              multiline
              rows={4}
              label="Describe your Question"
            />
            {empty && (
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
                disabled={mutation.isPending}
                sx={{ width: "6rem" }}
                onClick={handleClick}
                variant="contained"
              >
                {mutation.isPending ? "Sending" : "Send"}
              </Button>
            </Box>
            {mutation.isError && (
              <Typography color={"red"} marginTop={"2rem"} textAlign={"center"}>
                Error : {mutation.error.message}
              </Typography>
            )}

            <div style={hrStyles}>
              <div style={hrLineStyles}></div>
              <span className="text-hr__text" style={textStyles}>
                Or Call us Directly
              </span>
              <div style={hrLineStyles}></div>
            </div>
            <Typography textAlign={"center"} variant="body1">
              <b>📞 Phone No :-</b> +91 76181 69600
            </Typography>
          </Paper>
        </Box>
      </div>
    </>
  );
}
