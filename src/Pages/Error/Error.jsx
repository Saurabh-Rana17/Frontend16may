import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginY: "7rem",
        }}
      >
        <Paper sx={{ padding: "2rem" }} elevation={3}>
          <Typography
            component={"div"}
            sx={{
              marginBottom: {
                xs: "1rem",
                sm: "2rem",
              },
            }}
            gutterBottom
            variant="body1"
          >
            <Typography gutterBottom variant="h4">
              {" "}
              Oops!
            </Typography>
            <Typography gutterBottom variant="body1">
              Sorry, an unexpected error has occurred.
            </Typography>
            <Typography gutterBottom variant="body2" component={"i"}>
              {error.statusText || error.message}
            </Typography>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Link to={"/"}>Go to Home</Link>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
