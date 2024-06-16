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
import { Autocomplete, Chip } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../../store/UserProvider";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUpComponent({ setContent, setShowModal }) {
  const { setUserState } = useContext(userContext);
  let navigate = useNavigate();
  const [failed, setFailed] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    setIsEmpty(false);
    setEmailInvalid(false);
    setPasswordInvalid(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("fullName");
    const email = data.get("email");
    const phone = data.get("phoneNumber");
    const password = data.get("password");

    const interest = selectedItems;

    if (!name || !email || !phone || !password || !interest[0]) {
      setIsEmpty(true);
    } else if (!email.includes("@")) {
      setEmailInvalid(true);
    } else if (password.length < 6) {
      setPasswordInvalid(true);
    } else {
      setSubmitting(true);
      const response = await fetch(
        "http://localhost:8080/register",
        {
          method: "POST",
          body: JSON.stringify({
            name: data.get("fullName"),
            email: data.get("email"),
            phone: data.get("phoneNumber"),
            password: data.get("password"),
            interest: selectedItems,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        setErrmsg("something went wrong");
        toast.error("Failed");

        setSubmitting(false);
      } else if (response.headers.get("content-type")) {
        const user = await response.json();
        setUserState(user);
        setSubmitting(false);
        toast.success("Signed Up Successfully");
        setShowModal(false);
      } else {
        setSubmitting(false);
        toast.error("Failed");
        setFailed(true);
      }
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const handleChange = (event, newValues) => {
    setSelectedItems(newValues);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required={true}
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                {/* <Autocomplete
                  multiple
                  value={selectedItems}
                  onChange={handleChange}
                  options={[
                    "Adventure",
                    "Hill & Mountain lover",
                    "Religious",
                    "Romantic",
                    "Relaxation",
                    "Trekking lover",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      key={params}
                      {...params}
                      label="Select Interest or type here"
                    />
                  )}
                /> */}
                <Autocomplete
                  multiple
                  value={selectedItems}
                  onChange={handleChange}
                  options={[
                    "Adventure",
                    "Hill & Mountain lover",
                    "Religious",
                    "Romantic",
                    "Relaxation",
                    "Trekking lover",
                  ]}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    );
                  }}
                  renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={option}
                      />
                    ));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Interest or type here"
                    />
                  )}
                />
              </Grid>
            </Grid>
            {failed && (
              <Typography paddingY={1} align={"center"} sx={{ color: "red" }}>
                Email already exist
              </Typography>
            )}
            {isEmpty && (
              <Typography paddingY={1} align={"center"} sx={{ color: "red" }}>
                Please fill all values
              </Typography>
            )}
            {emailInvalid && (
              <Typography paddingY={1} align={"center"} sx={{ color: "red" }}>
                Please enter a valid email
              </Typography>
            )}
            {passwordInvalid && (
              <Typography paddingY={1} align={"center"} sx={{ color: "red" }}>
                Password length must be 6 or greater than six
              </Typography>
            )}
            {errmsg && (
              <Typography paddingY={1} align={"center"} sx={{ color: "red" }}>
                {errmsg}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              disabled={submitting}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {submitting ? "Signing Up" : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid marginBottom={4} item>
                <Link
                  component={"button"}
                  type="button"
                  onClick={() => setContent("signin")}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
