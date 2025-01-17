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
import React, { useEffect, useState } from "react";
import ImageUploader from "../../../components/Admin/ImageUploader";
import useFetch from "../../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Skeleton/Loader";
import ImageViewer from "../../../components/Admin/ImageViewer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../../../utility/postData";
import { toast } from "react-toastify";

export default function UpdateTourForm() {
  const params = useParams();
  const {
    data,
    error: fetchError,
    isError,
    isPending: loading,
  } = useFetch(`/tour/${params.id}`);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
        queryKey: [`/tour/${params.id}`, "/tour"],
      });
      navigate("/admin/managetour/update");
    },
    onError: () => {
      toast.error("Failed to Update");
    },
  });

  const [mainImg, setMainimg] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (data) {
      setName(data.title);
      setMainimg([data.image]);
      setDescription(data.description);
      const temp = data.category.map((el = "") => el.toUpperCase());
      setSelectedItems([...temp]);
    }
  }, [data]);

  const handleChange = (event, newValues) => {
    setSelectedItems(newValues);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const image = mainImg[0];
    if (!image) {
      setError("Please Upload atleast 1 image");
      return;
    }
    if (mainImg.length > 1) {
      setError("You can select only one image");
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
      id: params.id,
    };
    mutate({ url: "/tour/add", data: data });
  }

  if (isError) {
    return (
      <Typography marginTop={"2rem"} textAlign={"center"}>
        Error : {fetchError.message}
      </Typography>
    );
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
          Update Tour
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
          aria-required
          autoCapitalize="true"
          multiple
          value={selectedItems}
          // defaultValue={selectedItems}
          onChange={handleChange}
          options={[
            "ADVENTURE",
            "HILL & MOUNTAIN LOVER",
            "RELIGIOUS",
            "ROMANTIC",
            "RELAXATION",
            "TREKKING LOVER",
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
        {isPostError && (
          <Typography color={"red"}> Error : {postError.message} </Typography>
        )}
      </Paper>
    </Box>
  );
}
