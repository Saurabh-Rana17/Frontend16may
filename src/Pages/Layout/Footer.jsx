// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {"Copyright © "} {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// function Footer() {
//   return (
//     <Box
//       border={"1px solid black"}
//       component="footer"
//       sx={{ bgcolor: "background.paper", py: 5 }}
//     >
//       <Container maxWidth="lg">
//         <Typography
//           variant="subtitle1"
//           align="center"
//           color="text.secondary"
//           component="p"
//         >
//           This site is created and maintained by Gaurav Rana
//         </Typography>
//         <Copyright />
//       </Container>
//     </Box>
//   );
// }

// export default Footer;

import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box paddingY={"1rem"}></Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: "center",
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            This site is created and maintained by Gaurav Rana
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
