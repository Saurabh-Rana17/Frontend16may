import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function CategoryPost({ post }) {
  let navigate = useNavigate();
  function exploreHandler() {
    navigate("/category/" + post.name);
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={RouterLink} to={"/category/" + post.name}>
        <Card sx={{ display: { xs: "none", sm: "flex" } }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography
              sx={{ textTransform: "capitalize" }}
              component="h2"
              variant="h5"
            >
              {post.name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.summary.substring(0, 80)}...
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              onClick={exploreHandler}
            >
              Explore
            </Typography>
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
            alt={post.imageLabel}
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
            alt={post.imageLabel}
          />
          <CardContent>
            <Typography
              sx={{ textTransform: "capitalize" }}
              variant="h5"
              component="h2"
            >
              {post.name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.summary.substring(0, 197)} ...
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              onClick={exploreHandler}
            >
              Explore
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default CategoryPost;
