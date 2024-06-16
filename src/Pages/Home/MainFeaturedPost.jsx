import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { MainFeaturesPostData as post } from "../../utility/CONSTANT";
function MainFeaturedPost() {
  return (
    <>
      <Paper
        sx={{
          height: {
            sm: "70vh",
          },
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url("bg.jpeg")`,
        }}
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
                {post.name}
              </Typography>
              <Typography
                sx={{
                  marginBottom: {
                    sm: "3rem",
                  },
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
                variant="h5"
                color="inherit"
                paragraph
              >
                {post.description.substring(0, 199)}...
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
                {post.description.substring(0, 99)}...
              </Typography>
              <Link
                component={RouterLink}
                sx={{ color: "white" }}
                variant="subtitle1"
                to={`/package/${post.id}`}
              >
                Continue reading…
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default MainFeaturedPost;
