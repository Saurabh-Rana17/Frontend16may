import { Grid, Typography } from "@mui/material";
import React from "react";
import FeaturedPost from "../../../components/Post/FeaturedPost";
import HorizontalSkeleton from "../../../components/Skeleton/HorizontalSkeleton";
import useFetch from "../../../hooks/useFetch";

function UpdateTour() {
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
        Select a Tour to Update
      </Typography>
      {!loading && (
        <Grid container spacing={4}>
          {post.map((post) => (
            <FeaturedPost type="update" key={post.id} post={post} />
          ))}
        </Grid>
      )}
      {loading && <HorizontalSkeleton />}
    </>
  );
}

export default UpdateTour;
