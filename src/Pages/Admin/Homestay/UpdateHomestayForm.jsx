import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageUploader from "../../../components/Admin/ImageUploader";
import MapViewer from "../../../components/Admin/MapViewer";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../../components/Skeleton/Loader";
import ImageViewer from "../../../components/Admin/ImageViewer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../../../utility/postData";
import { toast } from "react-toastify";

export default function UpdateHomestayForm() {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data,
    error,
    isError,
    isPending: loading,
  } = useFetch(`/homestay/${params.id}`);

  const {
    mutate,
    isPending,
    error: postError,
    isError: isPostError,
  } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      toast.success("Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: [`/homestay/${params.id}`, "homestay"],
      });
      navigate("/admin/managehomestay/update");
    },
    onError: () => {
      toast.error("Failed to Update");
    },
  });

  const [mainImg, setMainimg] = useState([]);
  const [otherImg, setOtherImg] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [city, setCity] = useState("");
  const [localError, setLocalError] = useState("");
  const [maplocation, setMapLocation] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setLocation(data.location);
      setCost(data.cost);
      setCity(data.city);
      setMapLocation(data.mapLocation);
      setMainimg([data.images[0]]);
      setOtherImg(data.images.slice(1));
    }
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");
    const images = [...mainImg, ...otherImg];
    if (images.length < 1) {
      setLocalError("Please Upload atleast 1 image");
      return;
    }
    if (maplocation.includes("src")) {
      setLocalError("incorrect map");
      return;
    }
    if (!maplocation.includes("embed")) {
      setLocalError("incorrect map");
      return;
    }
    if (images.length > 9) {
      setLocalError(
        `Maximum limit is 9, you have selected ${
          images.length
        } images, Please remove ${images.length - 9} image`
      );
      return;
    }
    const dataObj = {
      name: name,
      images: [...mainImg, ...otherImg],
      location: location,
      mapLocation: maplocation,
      cost: cost,
      city: city,
      id: params.id,
    };
    mutate({ data: dataObj, url: "/homestay/add" });
  }
  if (isError) {
    return <p>Error:{error.message}</p>;
  }
  if (loading) {
    return <Loader />;
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
          Edit Homestay
        </Typography>

        <ImageViewer type="single" images={mainImg} setImages={setMainimg} />

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

        <ImageViewer type="multi" images={otherImg} setImages={setOtherImg} />

        <MapViewer
          type="update"
          location={maplocation}
          setLocation={setMapLocation}
        />

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
        {localError && (
          <>
            <br />
            <p style={{ color: "red" }}>{localError}</p>
          </>
        )}
        {isPostError && (
          <Typography color={"red"}> Error : {postError.message} </Typography>
        )}
      </Paper>
    </Box>
  );
}
