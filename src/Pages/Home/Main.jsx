import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { postSection } from "../../utility/CONSTANT";

function Main() {
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
          border: "2px gray",
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Explore the Unexplored
      </Typography>
      <Divider />
      <Box className="markdown">{postSection}</Box>
    </Grid>
  );
}

export default Main;
