import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../../store/UserProvider";
import AuthModal from "../../components/Modal/AuthModal";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../utility/postData";

export default function Cab() {
  const navigate = useNavigate();
  const { userState: user } = useContext(userContext);
  const [pickUp, setPickUp] = useState("");
  const [dropUp, setDropUp] = useState("");
  const [noOfPeople, setNoOfPeople] = useState("");
  const [date, setDate] = useState("");
  const [empty, setEmpty] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    mutate,
    isPending: isSubmitting,
    isError,
    error,
  } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      toast.success("Submitted Successfully");
      navigate("/inquirysuccess");
    },
    onError: () => {
      toast.error("Failed to Send Data");
    },
  });

  useEffect(() => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const tomorrowDate = currentDate.toJSON().slice(0, 10);
    setDate(tomorrowDate);
  }, []);
  async function handleClick() {
    setEmpty(false);
    if (!pickUp || !dropUp || !noOfPeople || !date) {
      setEmpty(true);
    } else if (!user) {
      setShowModal(true);
    } else {
      // const response = await fetch("http://localhost:8080/cab", {
      //   method: "",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: user.email,
      //     pickUp: pickUp,
      //     dropUp: dropUp,
      //     date: date,
      //     noOfPeople: noOfPeople,
      //   }),
      // });
      const data = {
        email: user.email,
        pickUp: pickUp,
        dropUp: dropUp,
        date: date,
        noOfPeople: noOfPeople,
      };

      mutate({ url: "/cab", data });
    }
  }

  return (
    <>
      <div style={{ margin: "auto" }}>
        <AuthModal setShowModal={setShowModal} showModal={showModal} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginY: "3rem",
            flexDirection: "row",
            // width: "38rem",
            textAlign: "center",
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
              Entere Your Cab Requirements
            </Typography>

            <TextField
              sx={{ marginBottom: "1.5rem" }}
              fullWidth
              required
              label="Pick Up Point"
              onChange={(e) => setPickUp(e.target.value)}
            />

            <TextField
              sx={{ marginBottom: "1.5rem" }}
              fullWidth
              required
              label="Drop Location"
              onChange={(e) => setDropUp(e.target.value)}
            />
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  sx={{ marginBottom: "1.5rem" }}
                  fullWidth
                  required
                  type="number"
                  label="No of People"
                  onChange={(e) => setNoOfPeople(e.target.value)}
                />
              </Grid>
              <Grid sm={5.7} item>
                <TextField
                  sx={{ marginBottom: "1.5rem" }}
                  fullWidth
                  required
                  type="date"
                  label="date"
                  value={date}
                  // defaultValue={new Date().toJSON().slice(0, 10)}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Grid>
            </Grid>

            {empty && (
              <Typography paddingTop={1} align={"center"} sx={{ color: "red" }}>
                Please enter a value
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                // marginTop: "1rem",
              }}
            >
              <Button
                disabled={isSubmitting}
                sx={{ width: "6rem" }}
                onClick={handleClick}
                variant="contained"
              >
                {isSubmitting ? "Sending" : "Send"}
              </Button>
            </Box>
            {isError && (
              <Typography color={"red"}> Error : {error.message} </Typography>
            )}
          </Paper>
        </Box>
      </div>
    </>
  );
}
