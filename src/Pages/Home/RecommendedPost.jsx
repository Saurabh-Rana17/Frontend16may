import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function RecommendedPost({ post }) {
  let navigate = useNavigate();
  let imgUrl;
  let navUrl;
  if (post.images) {
    imgUrl = post.images[0];
    navUrl = `/package/${post.id}`;
  } else {
    imgUrl = post.image;
    navUrl = `/tour/${post.id}`;
  }
  function exploreHandler() {
    if (post.images) navigate(navUrl);
  }

  return (
    <Grid item xs={12} sm={4}>
      <CardActionArea component={RouterLink} to={navUrl}>
        <Card
          sx={{
            maxWidth: 360,
            marginX: "auto",
            display: { xs: "block", sm: "block" },
          }}
        >
          <CardMedia
            component="img"
            height="250"
            image={imgUrl}
            alt={post.imageLabel}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {post.name ? post.name : post.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description.substring(0, 177)}...
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

export default RecommendedPost;
