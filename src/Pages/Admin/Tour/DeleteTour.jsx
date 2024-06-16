import { Button, Grid, Typography, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeaturedPost from "../../../components/Post/FeaturedPost";
import HorizontalSkeleton from "../../../components/Skeleton/HorizontalSkeleton";
import useFetch from "../../../hooks/useFetch";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { BaseUrl } from "../../../utility/CONSTANT";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function DeleteTour() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const { data: post, isError, error, isPending: loading } = useFetch("/tour");
  if (isError) {
    return (
      <Typography marginTop={"2rem"} textAlign={"center"}>
        Error : {error.message}
      </Typography>
    );
  }
  function handleClick(id) {
    async function fetchData() {
      setDeleting(true);
      const response = await fetch(BaseUrl + `/tour/delete/${id}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${response.status}  ${response.statusText}`
        );
      }
      const data = await response.json();
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["/tour"] });
        toast.success("deleted successfully");
        navigate("/admin/managetour/update");
      }
      setDeleting(false);
      return data;
    }
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Typography
        sx={{ textAlign: "center", paddingY: "2rem" }}
        component={"h1"}
        variant="h4"
      >
        Select a Tour to Delete
      </Typography>
      {!loading && (
        <Grid container spacing={4}>
          {post.map((post) => (
            <Grid key={post.id} item xs={12} md={6}>
              <Card sx={{ display: { xs: "none", sm: "flex" } }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    {post.name ? post.name : post.title}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {post.description.substring(0, 80)}...
                  </Typography>
                  <Button
                    disabled={deleting}
                    onClick={() => handleClick(post.id)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{
                    width: 160,
                    maxHeight: 170,
                    objectFit: "cover",
                    display: { xs: "none", sm: "flex" },
                  }}
                  image={post.image}
                  // alt={post.imageLabel}
                />
              </Card>

              <Card
                sx={{
                  maxWidth: 360,
                  marginX: "auto",
                  display: { xs: "block", sm: "none" },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={post.image}
                  // alt={post.imageLabel}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {post.name ? post.name : post.title}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {post.description.substring(0, 197)} ...
                  </Typography>
                  <Button
                    disabled={deleting}
                    onClick={() => handleClick(post.id)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {loading && <HorizontalSkeleton />}
    </>
  );
}

export default DeleteTour;
