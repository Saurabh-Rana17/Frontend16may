import { Divider, Link, Toolbar } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function ManageTourPackage() {
  const sections = [
    { title: "Add TourPackage", url: "add" },
    { title: "Update TourPackage", url: "update" },
    { title: "Delete TourPackage", url: "delete" },
  ];

  return (
    <>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "flex-start", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            component={NavLink}
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                backgroundColor: isActive ? grey[700] : "",
                borderRadius: "7px",
                color: isActive ? "white" : "",
              };
            }}
            noWrap
            key={section.title}
            variant="body2"
            to={section.url}
            sx={{
              p: 1,
              mr: "2rem",
              flexShrink: 0,
              backgroundColor: grey[100],
              ":hover": {
                backgroundColor: grey[500],
              },
            }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      <Divider />
      <Outlet />
    </>
  );
}
