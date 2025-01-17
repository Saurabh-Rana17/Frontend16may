import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import HorizontalSkeleton from "../../../components/Skeleton/HorizontalSkeleton";
import { BaseUrl } from "../../../utility/CONSTANT";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const fetchData = async () => {
  const response = await fetch(`http://localhost:8080/hotel/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cost: "0,100000000",
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${response.status}  ${response.statusText}`
    );
  }
  return response.json();
};

export default function DeleteHotel() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

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

  function handleDelete(id) {
    async function fetchData() {
      setDeleting(true);
      const response = await fetch(BaseUrl + `/hotel/delete/${id}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${response.status}  ${response.statusText}`
        );
      }
      const data = await response.json();
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["hotel"] });
        toast.success("deleted successfully");
        navigate("/admin/managehotel/update");
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
        Select a hotel to Delete
      </Typography>
      {!loading && (
        <Grid container spacing={4}>
          {post.map((post) => (
            <Grid key={post.id} item xs={12} md={6}>
              <Card
                sx={{
                  display: { xs: "none", sm: "flex" },
                  height: "10rem",
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    {post.name ? post.name : post.title}
                  </Typography>
                  <Typography
                    sx={{ height: "2.4rem" }}
                    variant="subtitle1"
                    paragraph
                  >
                    📍{post.location.substring(0, 70)}...
                  </Typography>
                  <Typography variant="subtitle1" component={"b"}>
                    💵<b>₹{post.cost}</b>
                  </Typography>
                  <Button
                    disabled={deleting}
                    onClick={() => handleDelete(post.id)}
                    sx={{ display: "block" }}
                    variant="contained"
                    color="error"
                  >
                    DELETE
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
                  image={post.images[0]}
                  alt={post.name}
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
                  image={post.images[0]}
                  alt={post.name}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {post.name ? post.name : post.title}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    📍{post.location.substring(0, 197)}
                  </Typography>
                  <Typography variant="subtitle1" component={"b"}>
                    💵<b>₹{post.cost}</b>
                  </Typography>
                  <Button
                    disabled={deleting}
                    onClick={() => handleDelete(post.id)}
                    sx={{ display: "block" }}
                    variant="contained"
                    color="error"
                  >
                    DELETE
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
