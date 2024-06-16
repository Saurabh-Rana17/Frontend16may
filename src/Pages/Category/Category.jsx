import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import FeaturedPost from "../../components/Post/FeaturedPost.jsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import HorizontalSkeleton from "../../components/Skeleton/HorizontalSkeleton.jsx";
import useFetch from "../../hooks/useFetch.js";

export default function Category() {
  const category = useParams().category;

  const {
    data,
    error,
    isError,
    isPending: loading,
  } = useFetch(`/category/${category}`);

  if (isError) {
    return (
      <Typography marginTop={"2rem"} textAlign={"center"}>
        Error : {error.message}
      </Typography>
    );
  }

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Divider />
      <Typography
        sx={{
          marginY: {
            xs: "1rem",
            sm: "2rem",
          },
        }}
        component="h2"
        variant="h5"
        align="center"
      >
        Here are some of the Tours under {category.toLocaleUpperCase()} category
      </Typography>

      {!loading && (
        <Grid container spacing={4}>
          {data.map((d) => (
            <FeaturedPost key={d.id} post={d} />
          ))}
        </Grid>
      )}
      {loading && <HorizontalSkeleton />}
    </ThemeProvider>
  );
}
