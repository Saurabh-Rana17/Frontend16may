import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ImageUploader from "../../../components/Admin/ImageUploader";
import { Category } from "@mui/icons-material";
import ImageViewer from "../../../components/Admin/ImageViewer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../../../utility/postData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddTour() {
  const [mainImg, setMainimg] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleChange = (event, newValues) => {
    setSelectedItems(newValues);
  };

  const {
    mutate,
    isPending,
    error: postError,
    isError,
  } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      toast.success("Added Successfully");
      queryClient.invalidateQueries({ queryKey: ["/tour"] });
      navigate("/admin/managetour/update");
    },
    onError: () => {
      toast.error("Failed to Submit");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const image = mainImg[0];
    if (!image) {
      setError("Please Upload atleast 1 image");
      return;
    }
    if (mainImg.length > 1) {
      setError("You can upload only one image");
      return;
    }
    if (selectedItems.length < 1) {
      setError("Select Category");
      return;
    }

    const data = {
      title: name,
      image: image,
      description,
      category: selectedItems,
    };
    mutate({ data: data, url: "/tour/add" });
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
          Add New Tour
        </Typography>

        <ImageViewer type="single" images={mainImg} setImages={setMainimg} />

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          label="Tour Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          multiline
          minRows={3}
          maxRows={25}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Autocomplete
          multiple
          value={selectedItems}
          onChange={handleChange}
          options={[
            "Adventure",
            "Hill & Mountain lover",
            "Religious",
            "Romantic",
            "Relaxation",
            "Trekking lover",
          ]}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option}>
                {option}
              </li>
            );
          }}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
              <Chip {...getTagProps({ index })} key={option} label={option} />
            ));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Category Here" />
          )}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
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
