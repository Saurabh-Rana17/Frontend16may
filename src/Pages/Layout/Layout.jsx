import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, createTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Bounce, ToastContainer } from "react-toastify";
import ScrollToTop from "../../utility/ScrollToTop";

export default function Layout() {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <ScrollToTop />
      <CssBaseline />
      <Container sx={{ minHeight: "90vh" }} maxWidth="lg">
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
        <Outlet />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
