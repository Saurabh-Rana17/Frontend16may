import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IMGBB } from "../../utility/CONSTANT";
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
  const [isDisabled, setIsDisabled] = useState(false);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections && fileRejections.length > 0) {
      // Handle rejection
      setError(` Make sure you upload  no more than ${maxFiles} files.`);
    } else {
      setError("");
      setUploadedImages((prev) => [...prev, ...acceptedFiles]);
    }
  }, []);

  useEffect(() => {
    if (uploadedImages.length >= maxFiles) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
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

  function handleRemove(fileToRemove) {
    const newArr = uploadedImages.filter((file) => file !== fileToRemove);
    setUploadedImages(newArr);
  }

  function generateUrl(file) {
    if (typeof file === "string") {
      return file;
    }
    return URL.createObjectURL(file);
  }

  const files = uploadedImages.map((file, index) => (
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
        // image={URL.createObjectURL(file)}
        image={generateUrl(file)}
        alt={file.path || ""}
        onError={handleImageError}
      />

      <CardActions>
        <Button
          onClick={() => handleRemove(file)}
          sx={{ width: "100%" }}
          color="error"
          size="small"
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  ));

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
          Uploaded Image
          {maxFiles === 1 ? "" : "s"}{" "}
        </h4>
        {files}
      </aside>
    </section>
  );
}

export default ImageUploader;
