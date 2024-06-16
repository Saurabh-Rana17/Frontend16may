import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ExlporeMoreTour from "./ExlporeMoreTour";
import VerticalSkeleton from "../../components/Skeleton/VerticalSkeleton";
import { userContext } from "../../store/UserProvider";
import RecommendedPost from "./RecommendedPost";
import useFetch from "../../hooks/useFetch";

export default function Recommended() {
  const { userState: user } = useContext(userContext);
  const query = user?.email ? "/" + user?.email : "";
  const {
    data: post,
    error,
    isError,
    isPending: loading,
  } = useFetch(`/interest${query}`, 5 * 60 * 1000);

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
        variant="h5"
      >
        {user?.email ? "Based on Interest" : ""} You May also like following
        Tours
      </Typography>
      {loading ? (
        <VerticalSkeleton />
      ) : (
        <Grid
          container
          sx={{
            paddingX: {
              xs: "none",
              sm: "2rem",
            },
          }}
          spacing={4}
        >
          {post.map((post) => (
            <RecommendedPost key={post.id} post={post} />
          ))}
          <ExlporeMoreTour />
        </Grid>
      )}
    </>
  );
}
