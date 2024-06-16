import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  LinearProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IMGBB } from "../../../utility/CONSTANT";
import { toast } from "react-toastify";
const dropZoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  margin: "20px auto",
  width: "80%",
};

const disabledDropZoneStyles = {
  ...dropZoneStyles,
  backgroundColor: "#f0f0f0",
  cursor: "not-allowed",
  opacity: 0.5,
};

const imagePreviewStyles = {
  width: "200px",
  height: "200px",
  objectFit: "cover",
  margin: "0px",
};

function ImageUploader({ maxFiles, uploadedImages, setUploadedImages }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections && fileRejections.length > 0) {
      // Handle rejection
      setError(` Make sure you upload  no more than ${maxFiles} files.`);
    } else {
      setError("");
      setLoading(true);
      uploadImages(acceptedFiles);
    }
  }, []);

  useEffect(() => {
    if (uploadedImages.length >= maxFiles) {
      setIsDisabled(true);
    }
  }, [uploadedImages]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles,
    onDrop: onDrop,
  });

  const handleImageError = (event) => {
    // Handle image error
    toast.error("Error loading image");
    console.log("Error loading image:", event.target.src);
  };

  const uploadImages = async (files) => {
    const API_KEY = IMGBB;
    const totalFiles = files.length;
    let completedFiles = 0;

    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append("image", file);

      return axios
        .post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setOverallProgress((prevProgress) => {
              const newProgress =
                (completedFiles * 100 + percentCompleted) / totalFiles;
              return newProgress;
            });
          },
        })
        .then((response) => {
          completedFiles += 1;

          return response.data.data;
        })
        .catch((error) => {
          console.error("Error uploading to ImageBB:", error);
          console.log("Error response data:", error.response.data);
          console.log("Error response status:", error.response.status);
          console.log("Error response headers:", error.response.headers);
          setError("Error uploading to ImageBB. Please try again.");
        });
    });

    const results = await Promise.all(promises);
    setLoading(false);
    const temp = results.map((result) => result.url);
    setUploadedImages((prev) => [...prev, ...temp]);
    setOverallProgress(0);
  };
  return (
    <section style={{ marginBottom: "0.5rem" }} className="container">
      {isDisabled && (
        <div style={isDisabled ? disabledDropZoneStyles : dropZoneStyles}>
          <p>Maximum Limit Reached, Remove a File Before Uploading more</p>
        </div>
      )}

      {!isDisabled && (
        <div
          style={dropZoneStyles}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <p>
            Click here to select {maxFiles === 1 && "Main"} Image , Max limit{" "}
            {maxFiles} Image
          </p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <aside>
        <h4>
          {loading ? "Uploading" : "Uploaded"} Image
          {maxFiles === 1 ? "" : "s"}{" "}
        </h4>
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress value={overallProgress} variant="determinate" />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">
                {Math.round(overallProgress)}%
              </Typography>
            </Box>
          </Box>
        )}
        {!loading && (
          <>
            <div>
              {uploadedImages.map((image, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "200px",
                    margin: "0.5rem",
                    display: "inline-block",
                  }}
                >
                  {/* <img
                    alt="image uploaded successfully"
                    loading="lazy"
                    src={image}
                    style={imagePreviewStyles}
                  /> */}
                  <CardMedia
                    component="img"
                    sx={{
                      width: 200,
                      maxHeight: 200,
                      objectFit: "cover",
                    }}
                    onError={handleImageError}
                    image={image}
                    alt="image uploaded successfully"
                  />

                  <CardActions>
                    <Button sx={{ width: "100%" }} color="error" size="small">
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </>
        )}
      </aside>
    </section>
  );
}

export default ImageUploader;
