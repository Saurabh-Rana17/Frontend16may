import { Grid, Typography, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeaturedPost from "../../components/Post/FeaturedPost";
import HorizontalSkeleton from "../../components/Skeleton/HorizontalSkeleton";
import useFetch from "../../hooks/useFetch";

function Explore() {
  const { data: post, isError, error, isPending: loading } = useFetch("/tour");
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
        Explore All Tour
      </Typography>
      {!loading && (
        <Grid container spacing={4}>
          {post.map((post) => (
            <FeaturedPost key={post.id} post={post} />
          ))}
        </Grid>
      )}
      {loading && <HorizontalSkeleton />}
    </>
  );
}

export default Explore;
