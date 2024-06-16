import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function MainFeaturedSkeleton() {
  const post =
    "The Char Dham Yatra is a revered pilgrimage circuit in the Indian state of Uttarakhand, comprising ...";
  const postname = "Char Dham Yatra";
  return (
    <Paper
      sx={{
        height: {
          sm: "70vh",
        },
        position: "relative",
        // backgroundColor: "grey.100",
        color: "#fff",
        mb: 4,
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
        // backgroundImage: `url("https://lh3.googleusercontent.com/drive-viewer/AKGpihbe7MC39Zk4WvjeGzoIe4i_uoMgBGJjvAGd3kWQ2nUGk-srSte926e9aKBNp47j3dm9KJb_fiCs74S3M1-pGwhyyftoRUZNo4A=s1600-rw-v1")`,
      }}
    >
      <Skeleton
        sx={{
          height: "100%",
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        variant="rectangular"
      >
        {/* Increase the priority of the hero background image */}
      </Skeleton>
      <Skeleton
        sx={{
          height: "100%",
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        variant="rectangular"
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={{
                  marginBottom: {
                    sm: "3rem",
                  },
                }}
              >
                {postname}
              </Typography>

              <Typography
                sx={{
                  marginBottom: {
                    sm: "3rem",
                  },
                  display: {
                    xs: "block",
                    sm: "none",
                  },
                }}
                variant="h5"
                color="inherit"
                paragraph
              >
                {post}
              </Typography>
              <RouterLink sx={{ color: "white" }} variant="subtitle1">
                Continue reading…
              </RouterLink>
            </Box>
          </Grid>
        </Grid>
      </Skeleton>
    </Paper>
  );
}

export default MainFeaturedSkeleton;
