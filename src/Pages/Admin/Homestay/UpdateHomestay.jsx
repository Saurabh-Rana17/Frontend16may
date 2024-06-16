import { Grid, Typography } from "@mui/material";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import HorizontalSkeleton from "../../../components/Skeleton/HorizontalSkeleton";
import HotelPost from "../../Hotel/HotelPost";
import HomestayPost from "../../Homestay/HomestayPost";
import useFetch from "../../../hooks/useFetch";

export default function UpdateHomestay() {
  // const loading = false;
  const {
    data: post,
    isError,
    error,
    isPending: loading,
  } = useFetch("/homestay");

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
        Select a Homestay to update
      </Typography>
      {!loading && (
        <Grid container spacing={4}>
          {post.map((post) => (
            <HotelPost key={post.id} post={post} type={"update"} />
          ))}
        </Grid>
      )}
      {loading && <HorizontalSkeleton />}
    </>
  );
}
