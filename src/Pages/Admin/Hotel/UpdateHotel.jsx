import { Grid, Typography } from "@mui/material";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import HorizontalSkeleton from "../../../components/Skeleton/HorizontalSkeleton";
import HotelPost from "../../Hotel/HotelPost";

const fetchData = async () => {
  const response = await fetch(
    `http://localhost:8080/hotel/filter`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cost: "0,100000000",
      }),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${response.status}  ${response.statusText}`
    );
  }
  return response.json();
};

export default function UpdateHotel() {
  // const loading = false;
  const {
    data: post,
    isError,
    error,
    isPending: loading,
  } = useQuery({ queryKey: ["/hotel"], queryFn: fetchData });

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
        Select a hotel to update
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
