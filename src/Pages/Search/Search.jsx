import { useParams } from "react-router-dom";
import FeaturedPost from "../../components/Post/FeaturedPost.jsx";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

import Loader from "../../components/Skeleton/Loader.jsx";
import useFetch from "../../hooks/useFetch.js";
import { Typography } from "@mui/material";

export default function Search() {
  const param = useParams();
  const {
    data: post,
    error,
    isError,
    isPending: loading,
  } = useFetch(`/search/${param.query}`);

  if (isError) {
    return (
      <Typography marginTop={"2rem"} textAlign={"center"}>
        Error : {error.message}
      </Typography>
    );
  }

  if (post && post.length === 0) {
    return (
      <Typography marginTop={"2rem"} textAlign={"center"}>
        Not Found
      </Typography>
    );
  }

  return (
    <>
      {!loading && (
        <Grid container spacing={4}>
          {post.map((post) => (
            <FeaturedPost key={post.id} post={post} />
          ))}
        </Grid>
      )}
      {loading && <Loader />}
    </>
  );
}
