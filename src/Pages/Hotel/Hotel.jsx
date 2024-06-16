import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import HotelPost from "./HotelPost";
import HorizontalSkeleton from "../../components/Skeleton/HorizontalSkeleton";
import { useQuery } from "@tanstack/react-query";

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

function Hotel() {
  const [searchLoading, setLoading] = useState(false);
  const [searchData, setData] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [showFetch, setShowFetch] = useState(true);

  const {
    data,
    isPending: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Hotel"],
    queryFn: fetchData,
  });

  if (isError) {
    return (
      <Typography marginTop={"2rem"} textAlign={"center"}>
        Error : {error.message}
      </Typography>
    );
  }

  async function handleClick() {
    const postData = {};
    if (name.trim()) {
      postData["search"] = name;
    }
    if (city.trim()) {
      postData.city = city;
    }
    if (min) {
      postData.cost = min;
    } else {
      postData.cost = 0;
    }
    if (max) {
      postData.cost += "," + max;
    } else {
      postData.cost += "," + 10000000;
    }
    setShowFetch(false);
    setLoading(true);
    const res = await fetch(`http://localhost:8080/hotel/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const response = await res.json();
    setLoading(false);
    setData(response);
  }

  return (
    <>
      <Box sx={{ margin: "1rem", textAlign: "center" }}>
        <Paper
          elevation={5}
          sx={{
            padding: {
              xs: "1rem",
              sm: "2rem",
            },
          }}
        >
          <Box
            marginBottom={{ xs: "0.5rem", sm: "none" }}
            marginRight={"1rem"}
            sx={{ display: "inline-block" }}
          >
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              variant="standard"
            />
          </Box>
          <Box
            marginBottom={{ xs: "0.5rem", sm: "none" }}
            marginRight={"1rem"}
            sx={{ display: "inline-block" }}
          >
            <TextField
              value={city}
              onChange={(e) => setCity(e.target.value)}
              label="City"
              variant="standard"
            />
          </Box>
          <Box
            marginBottom={{ xs: "0.5rem", sm: "none" }}
            marginRight={"1rem"}
            sx={{ display: "inline-block" }}
          >
            <TextField
              value={min}
              onChange={(e) => setMin(e.target.value)}
              type="number"
              label="Min Cost"
              variant="standard"
            />
          </Box>
          <Box
            marginBottom={{ xs: "0.5rem", sm: "none" }}
            marginRight={"1rem"}
            sx={{ display: "inline-block" }}
          >
            <TextField
              value={max}
              onChange={(e) => setMax(e.target.value)}
              type="number"
              label="Max Cost"
              variant="standard"
            />
          </Box>

          <Button
            onClick={handleClick}
            sx={{
              marginTop: {
                xs: "1rem",
                sm: "0.5rem",
              },
            }}
            variant="contained"
          >
            Search Hotel
          </Button>
        </Paper>
      </Box>
      <Typography
        sx={{ textAlign: "center", paddingY: "2rem" }}
        component={"h1"}
        variant="h4"
      >
        Explore All Hotel
      </Typography>
      {showFetch && !loading && (
        <Grid container spacing={4}>
          {data.map((post) => (
            <HotelPost key={post.id} post={post} />
          ))}
        </Grid>
      )}
      {loading && showFetch && <HorizontalSkeleton />}
      {/* showing data after fetch */}
      {!showFetch && !searchLoading && (
        <Grid container spacing={4}>
          {searchData.map((post) => (
            <HotelPost key={post.id} post={post} />
          ))}
        </Grid>
      )}
      {!showFetch && searchLoading && <HorizontalSkeleton />}
    </>
  );
}

export default Hotel;
