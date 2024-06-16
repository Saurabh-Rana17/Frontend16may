import { Grid, Typography } from "@mui/material";
import React from "react";
import FeaturedPost from "../../components/Post/FeaturedPost";
import HorizontalSkeleton from "../../components/Skeleton/HorizontalSkeleton";
import HotelPost from "../Hotel/HotelPost";
import HomestayPost from "./HomestayPost";
import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

export default function Homestay() {
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
        Explore All Homestay
      </Typography>
      {!loading && (
        <Grid container spacing={4}>
          {post.map((post) => (
            <HomestayPost key={post.id} post={post} />
          ))}
        </Grid>
      )}
      {loading && <HorizontalSkeleton />}
    </>
  );
}
