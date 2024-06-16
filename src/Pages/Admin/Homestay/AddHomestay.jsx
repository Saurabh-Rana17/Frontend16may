import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageUploader from "../../../components/Admin/ImageUploader";
import MapViewer from "../../../components/Admin/MapViewer";
import ImageViewer from "../../../components/Admin/ImageViewer";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { postData } from "../../../utility/postData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddHomestay() {
  const [mainImg, setMainimg] = useState([]);
  const [otherImg, setOtherImg] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [maplocation, setMapLocation] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate,
    isPending,
    error: postError,
    isError,
  } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      toast.success("Added Successfully");
      queryClient.invalidateQueries({ queryKey: ["/homestay"] });
      navigate("/admin/managehomestay/update");
    },
    onError: () => {
      toast.error("Failed to Submit");
    },
  });

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
    if (!maplocation.includes("embed")) {
      setError("incorrect map");
      return;
    }
    if (images.length > 9) {
      setError(
        `Maximum limit is 9, you have selected ${
          images.length
        } images, Please remove ${images.length - 9} image`
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

    mutate({ data: data, url: "/homestay/add" });
    // const data = await
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
          Add new Homestay
        </Typography>

        <ImageViewer images={mainImg} setImages={setMainimg} type="single" />

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          label="Homestay Name"
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
              type="number"
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

        <ImageViewer images={otherImg} setImages={setOtherImg} type="multi" />

        <MapViewer location={maplocation} setLocation={setMapLocation} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            disabled={isPending}
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
        {isError && (
          <Typography color={"red"}> Error : {postError.message} </Typography>
        )}
      </Paper>
    </Box>
  );
}
