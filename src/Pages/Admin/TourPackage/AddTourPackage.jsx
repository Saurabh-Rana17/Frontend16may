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
import ImageViewer from "../../../components/Admin/ImageViewer";

export default function AddTourPackage() {
  const [mainImg, setMainimg] = useState([]);
  const [otherImg, setOtherImg] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [tourOption, setTourOption] = useState([]);

  const {
    data: post,
    isError,
    error: fetchError,
    isPending: loading,
  } = useFetch("/tour");

  useEffect(() => {
    if (post) {
      const temp = post.map((el) => {
        return {
          label: el.title,
          value: el.id,
        };
      });
      setTourOption(temp);
    }
  }, [post]);

  const handleChange = (event, newValues) => {
    setSelectedItems(newValues);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const images = [...mainImg, ...otherImg];
    const tourArr = selectedItems.map((el) => el.value);
    if (images.length < 1) {
      setError("Please Upload atleast 1 image");
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
    if (tourArr.length < 1) {
      setError("Please select atleast 1 tour");
      return;
    }
    const data = {
      name: name,
      images: [...mainImg, ...otherImg],
      description: description,
      tours: tourArr,
    };
    console.log(data);
  }

  if (isError) {
    return (
      <Typography marginTop={"2rem"} textAlign={"center"}>
        Error : {fetchError.message},Try refreshing the Page
      </Typography>
    );
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
          Add New Tour Package
        </Typography>

        {/* <ImageUploader
          maxFiles={1}
          uploadedImages={mainImg}
          setUploadedImages={setMainimg}
        /> */}

        <ImageViewer type="single" images={mainImg} setImages={setMainimg} />

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          fullWidth
          required
          label="Tour Package Name"
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

        {/* <ImageUploader
          setUploadedImages={setOtherImg}
          uploadedImages={otherImg}
          maxFiles={8}
        /> */}

        <ImageViewer type="multi" images={otherImg} setImages={setOtherImg} />

        {loading ? (
          "Fetching Tours"
        ) : (
          <Autocomplete
            multiple
            value={selectedItems}
            onChange={handleChange}
            options={tourOption}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              );
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.value}
                  label={option.label}
                />
              ));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Tours included Here" />
            )}
          />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
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
