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
import MapViewer from "../../../components/Admin/MapViewer";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Skeleton/Loader";
import ImageViewer from "../../../components/Admin/ImageViewer";

export default function AddTourPackage() {
  const params = useParams();
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

  const {
    data: packages,
    packageError,
    packageIsError,
    isPending: packageLoading,
  } = useFetch(`/package/${params.id}`);

  useEffect(() => {
    if (packages && post) {
      setName(packages.name);
      setMainimg([packages.images[0]]);
      setOtherImg(packages.images.slice(1));
      setDescription(packages.description);

      const temp1 = post.map((el) => {
        return {
          label: el.title,
          value: el.id,
        };
      });
      setTourOption(temp1);

      const temp2 = packages.tours.map((el) => {
        return {
          label: el.title,
          value: el.id,
        };
      });
      setSelectedItems(temp2);
      // console.log(temp1);
      // console.log(temp2);
    }
  }, [post, packages]);

  const handleChange = (event, newValues) => {
    // console.log(newValues);
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
      id: params.id,
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

  if (packageLoading) {
    return <Loader />;
  }

  if (packageIsError) {
    return (
      <Typography marginTop={"2rem"} textAlign={"center"}>
        Error : {packageError.message}
      </Typography>
    );
  }

  //   {
  //     "label": "Kedarnath Temple",
  //     "value": "662ba892e5940cc79c4d6e0b"
  // }

  //   {
  //     "label": "Kedarnath Temple",
  //     "value": "662ba892e5940cc79c4d6e0b"
  // }

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
          Update Tour Package
        </Typography>

        <ImageViewer type="single" setImages={setMainimg} images={mainImg} />
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

        <ImageViewer type="multi" setImages={setOtherImg} images={otherImg} />

        {loading ? (
          "Fetching Tours"
        ) : (
          <Autocomplete
            multiple
            value={selectedItems}
            onChange={handleChange}
            options={tourOption}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
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
