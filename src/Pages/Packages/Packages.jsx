import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeaturedPost from "../../components/Post/FeaturedPost";
import HorizontalSkeleton from "../../components/Skeleton/HorizontalSkeleton";
import useFetch from "../../hooks/useFetch";

function Packages() {
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
        Explore All Packages
      </Typography>
      {!loading && (
        <Grid container spacing={4}>
          {packages.map((packageItem) => (
            <FeaturedPost key={packageItem.id} post={packageItem} />
          ))}
        </Grid>
      )}
      {loading && <HorizontalSkeleton />}
    </>
  );
}

export default Packages;
