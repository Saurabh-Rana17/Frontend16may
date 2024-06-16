import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import MapViewer from "./MapViewer";

export default function AddHotel() {
  const [mainImg, setMainimg] = useState([]);
  const [otherImg, setOtherImg] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [maplocation, setMapLocation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const images = [...mainImg, ...otherImg];
    if (images.length < 1) {
      setError("Please Upload atleast 1 image");
      return;
    }
    if (maplocation.includes("src")) {
      setError("incorrect map");
      return;
    }
    if (images.length > 9) {
      setError(
        `Maximum limit is 9, you have selected ${
          images.length
        } images, Please remove ${images.length - 9}images`
      );
      return;
    }
    const data = {
      name: name,
      images: [...mainImg, ...otherImg],
      location: location,
      mapLocation: maplocation,
      cost: cost,
      city: city,
    };

    console.log(data);
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

        <Typography variant="h6">Select Main Image</Typography>

        <ImageUploader
          maxFiles={1}
          uploadedImages={mainImg}
          setUploadedImages={setMainimg}
        />

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          label="Hotel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          multiline
          maxRows={3}
          label="Address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Grid spacing={2} container>
          <Grid item xs={6}>
            <TextField
              sx={{ marginBottom: "1.5rem" }}
              fullWidth
              required
              label="Price"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ marginBottom: "1.5rem" }}
              fullWidth
              required
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
        </Grid>

        <Typography variant="h6">Add Other Images Max Limit is 8</Typography>

        <ImageUploader
          setUploadedImages={setOtherImg}
          uploadedImages={otherImg}
          maxFiles={8}
        />

        <MapViewer location={maplocation} setLocation={setMapLocation} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
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
        {error && (
          <>
            <br />
            <p style={{ color: "red" }}>{error}</p>
          </>
        )}
      </Paper>
    </Box>
  );
}
