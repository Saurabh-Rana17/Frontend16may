import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function ExlporeMoreTour() {
  const navigate = useNavigate();
  const description =
    "Uttarakhand, nestled in the Himalayas, boasts diverse landscapes attracting tourists worldwide. From the spiritual ambiance of Rishikesh and Haridwar to the serene lakes of Nainital, and the adventure hub of Jim Corbett National Park, Uttarakhand offers a plethora of experiences. Trekking in the Garhwal and Kumaon regions, witnessing the majestic peaks like Nanda Devi, and exploring quaint hill stations like Mussoorie make it a haven for nature lovers and adventurers alike.";

  function exploreHandler() {
    navigate("/explore");
  }
  return (
    <Grid item xs={12} sm={4}>
      <CardActionArea component={RouterLink} to={"/explore"}>
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
            image={
              "https://uttarakhandtourism.gov.in/sites/default/files/2021-02/Banner2_0.jpg"
            }
            alt={"explore more "}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              Explore More
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {description.substring(0, 190)} ...
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
