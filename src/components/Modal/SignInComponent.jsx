import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { blue } from "@mui/material/colors";
import { userContext } from "../../store/UserProvider";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInComponent({ setContent, setShowModal }) {
  const { setUserState } = useContext(userContext);
  let navigate = useNavigate();
  const [failed, setfailed] = React.useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    setIsEmpty(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      setIsEmpty(true);
    } else {
      setSubmitting(true);
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.headers.get("content-type")) {
        const user = await response.json();

        setUserState(user);
        setSubmitting(false);
        toast.success("Signed In Successfully");
        setShowModal(false);
      } else {
        setfailed(true);
        toast.error("Failed ");
        setSubmitting(false);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {failed && (
              <Typography align={"center"} sx={{ color: "red" }}>
                Incorrect username or password
              </Typography>
            )}
            {isEmpty && (
              <Typography align={"center"} sx={{ color: "red" }}>
                Please Enter some value
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              disabled={submitting}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {submitting ? "Signing in" : "Sign in"}
            </Button>
            <Grid container>
              <Grid marginBottom={4} item>
                <Link
                  onClick={() => setContent("signup")}
                  component={"button"}
                  type="button"
                  sx={{}}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
