import { Grid, Typography, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeaturedPost from "../../../components/Post/FeaturedPost";
import HorizontalSkeleton from "../../../components/Skeleton/HorizontalSkeleton";
import useFetch from "../../../hooks/useFetch";

function UpdateTourPackage() {
  const {
    data: packages,
    error,
    isError,
    isPending: loading,
  } = useFetch("/package");

  if (isError) {
    return (
      <Typography marginTop={"2rem"} textAlign={"center"}>
        Error : {error.message}
      </Typography>
    );
  }

  return (
    <>
      <Typography
        sx={{ textAlign: "center", paddingY: "2rem" }}
        component={"h1"}
        variant="h4"
      >
        Select a Tour Package to Update
      </Typography>
      {!loading && (
        <Grid container spacing={4}>
          {packages.map((packageItem) => (
            <FeaturedPost
              type="package"
              key={packageItem.id}
              post={packageItem}
            />
          ))}
        </Grid>
      )}
      {loading && <HorizontalSkeleton />}
    </>
  );
}

export default UpdateTourPackage;
