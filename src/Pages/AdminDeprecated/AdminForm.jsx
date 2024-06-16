import {
  Box,
  Button,
  CardMedia,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../store/UserProvider";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../../utility/checkAdmin";

export default function AdminForm() {
  const navigate = useNavigate();
  const [mainImg, setMainImg] = useState("");
  const [showMainImg, setShowMainImg] = useState(false);
  const { userState } = useContext(userContext);

  useEffect(() => {
    const { isAdmin } = checkAdmin(userState);
    if (!isAdmin) {
      navigate("/");
    }
  }, [userState]);

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
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
          width: "40rem",
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
          Add new Hotel
        </Typography>

        <TextField
          sx={{ marginBottom: "1rem" }}
          fullWidth
          required
          label="Main Image Link"
          value={mainImg}
          onChange={(e) => {
            setMainImg(e.target.value);
            setShowMainImg(false);
          }}
        />
        <Button
          disabled={showMainImg}
          onClick={() => setShowMainImg(true)}
          sx={{ marginBottom: "1rem" }}
          variant="contained"
        >
          Show Main Image
        </Button>
        {showMainImg && (
          <CardMedia
            component="img"
            sx={{
              width: "300px",
              height: "auto",
              mx: "auto",

              marginBottom: "1rem",
            }}
            image={mainImg}
            alt="Image Not Found"
          />
        )}

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          label="Hotel Name"
        />

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          multiline
          maxRows={3}
          label="Address"
        />

        <Grid spacing={2} container>
          <Grid item xs={6}>
            <TextField
              sx={{ marginBottom: "1.5rem" }}
              fullWidth
              required
              label="Price"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ marginBottom: "1.5rem" }}
              fullWidth
              required
              label="City"
            />
          </Grid>
        </Grid>

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          label="Image 2"
        />
        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          label="Image 3"
        />
        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          label="Image 4"
        />
        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          label="Image 5"
        />
        <TextField
          sx={{ marginBottom: "1rem" }}
          fullWidth
          required
          label="Image 6"
        />
        <Button sx={{ marginBottom: "1rem" }} variant="contained">
          Show All Images
        </Button>

        <TextField
          sx={{ marginBottom: "1rem" }}
          fullWidth
          required
          label="Google Map link"
        />

        <Button sx={{ marginBottom: "1rem" }} variant="contained">
          Show Google Map
        </Button>

        {/* {empty && (
          <Typography paddingTop={1} align={"center"} sx={{ color: "red" }}>
            Please enter a value
          </Typography>
        )} */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // marginTop: "1rem",
          }}
        >
          <Button
            type="submit"
            color="success"
            sx={{ width: "6rem" }}
            variant="contained"
          >
            Upload
          </Button>
        </Box>
        {/* {isError && (
          <Typography color={"red"}> Error : {error.message} </Typography>
        )} */}
      </Paper>
    </Box>
  );
}
