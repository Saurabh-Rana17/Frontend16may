import { Box, Card, CardContent, Grid, Skeleton } from "@mui/material";
import React from "react";

function SkeletonItem() {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Card sx={{ display: { xs: "none", sm: "flex" } }}>
          <CardContent sx={{ flex: 1 }}>
            <Skeleton
              component={"h2"}
              height={"3.1rem"}
              variant="text"
              width={"200px"}
            ></Skeleton>
            <Skeleton height="2.9rem" variant="rectangular">
              {/* {post.description.substring(0, 80)}... */}
            </Skeleton>
            <Skeleton
              variant="text"
              width={"4rem"}
              height={"2rem"}
              color="primary"
              //   onClick={exploreHandler}
            ></Skeleton>
          </CardContent>
          <Skeleton
            variant="rectangular"
            sx={{
              width: 160,
              height: 160,
              display: { xs: "none", sm: "flex" },
            }}
            // image={imgUrl}
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
    </>
  );
}

export default function HorizontalSkeleton() {
  return (
    <Grid container spacing={4}>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </Grid>
  );
}
