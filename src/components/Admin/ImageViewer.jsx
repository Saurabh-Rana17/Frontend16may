import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardActions,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ImageViewer({ type = "multi", images, setImages }) {
  const max = type === "multi" ? 8 : 1;
  const [imgText, setImgText] = useState("");
  const [showMainImg, setShowMainImg] = useState(true);
  //   const [images, setImages] = useState([]);
  const [disable, setDisable] = useState(false);

  const placeHolder =
    type === "multi" ? "add link 1 \nadd link 2 \nadd link 3" : "Main Link";

  useEffect(() => {
    if (images.length >= max) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [images]);

  function handleRemove(url) {
    const temp = images.filter((image) => image !== url);
    setImages(temp);
  }

  function handleSave() {
    const splitArr = imgText.split("\n");
    const temp = splitArr.filter((image) => image.includes("http"));
    setImages((prev) => {
      return [...prev, ...temp];
    });
    setImgText("");
    setShowMainImg(true);
  }

  const files = images.map((file, index) => (
    <Card
      key={index}
      sx={{
        width: "200px",
        margin: "0.5rem",
        display: "inline-block",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          // objectFit: "cover",
          width: "200px",
          height: "200px",
          objectFit: "cover",
        }}
        loading="lazy"
        image={file}
        alt={"failed"}
      />

      <CardActions>
        <Button
          onClick={() => handleRemove(file)}
          sx={{ width: "100%" }}
          color="error"
          size="small"
          onError={() => {
            console.log("failed to load ");
          }}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  ));

  return (
    <>
      <Typography variant="h6">
        Select {max === 1 ? "Main" : "Other"} Image
      </Typography>
      <Grid marginBottom={0} container>
        <Grid xs={10} item>
          <TextField
            disabled={disable}
            multiline
            minRows={max === 1 ? 1 : 3}
            maxRows={14}
            required={max === 1 ? true : false}
            sx={{
              marginBottom: "0rem",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              },
            }}
            fullWidth
            label={
              type === "multi" ? "Add Other Images Link" : "Add Main Image Link"
            }
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={placeHolder}
            value={imgText}
            onChange={(e) => {
              setImgText(e.target.value);
            }}
          />
          {!disable ? (
            <Typography
              variant="body2"
              marginBottom={"1rem"}
              textAlign={"center"}
            >
              you can add max {max} image{max === 1 ? "" : "s"} here
              <br />
              enter each link on new line
            </Typography>
          ) : (
            <Typography
              variant="body2"
              //   color={"red"}
              marginBottom={"1rem"}
              textAlign={"center"}
            >
              Maximum image added
              <br />
              {images.length - max > 0 && (
                <span style={{ color: "red" }}>
                  remove {images.length - max} image before submitting{" "}
                </span>
              )}
            </Typography>
          )}
        </Grid>

        <Grid xs={2} item>
          <Button
            disabled={!imgText || disable}
            onClick={handleSave}
            sx={{
              height: "56px",
              width: "100%",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>

      {showMainImg && images.length > 0 && (
        <>
          <Button
            variant="contained"
            onClick={() => {
              setShowMainImg(false);
              setTimeout(() => {
                setShowMainImg(true);
              }, 1);
            }}
          >
            Refresh
          </Button>
          <Box>{files}</Box>
        </>
      )}
    </>
  );
}
