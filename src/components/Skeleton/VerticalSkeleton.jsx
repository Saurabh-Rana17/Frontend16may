import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

function SkeletonItem() {
  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          maxWidth: 360,
          marginX: "auto",
          //   display: { xs: "block", sm: "none" },
        }}
      >
        <Skeleton
          variant="rectangular"
          height="250px"
          width="100%"

          //   image={imgUrl}
          //   alt={post.imageLabel}
        />
        <CardContent>
          <Skeleton
            height={"2rem"}
            width={"10rem"}
            variant="rectangular"
            component="h2"
          >
            {/* {post.name ? post.name : post.title} */}
          </Skeleton>
          <Skeleton height={"6rem"} variant="rectangular">
            {/* {post.description.substring(0, 197)} ... */}
          </Skeleton>
          <Box marginTop={"1rem"}></Box>
          <Skeleton
            height={"2rem"}
            width={"5rem"}
            variant="rectangular"
            color="primary"
            // onClick={exploreHandler}
          ></Skeleton>
        </CardContent>
      </Card>
    </Grid>
  );
}

function VerticalSkeleton() {
  return (
    <Grid container spacing={4}>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </Grid>
  );
}

export default VerticalSkeleton;
