import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function convertString(demostr = "") {
  if (!demostr.includes("http")) {
    return "";
  }
  if (!demostr.includes(`"`)) {
    return demostr;
  }
  const temp = demostr.split(`"`)[1];
  return temp;
}

export default function MapViewer({ location, setLocation, type = "add" }) {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (type === "update") {
      setShowMap(true);
    }
  }, []);

  function handleClick() {
    const newStr = convertString(location);
    setLocation(newStr);
    if (newStr) {
      setShowMap(true);
    }
  }
  return (
    <>
      <Grid container>
        <Grid xs={9} item>
          <TextField
            value={location}
            onChange={(e) => {
              setShowMap(false);

              setLocation(e.target.value);
            }}
            sx={{
              marginBottom: "1rem",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              },
            }}
            fullWidth
            required
            label="Google Map link"
          />
        </Grid>
        <Grid xs={3} item>
          <Button
            onClick={handleClick}
            sx={{
              height: "56px",
              width: "100%",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Box
        margin={"1rem auto"}
        sx={{
          width: {
            xs: "auto",
            sm: "550px",
          },
          height: {
            xs: "300px",
          },
        }}
      >
        {!showMap && <p>Click on Save Button to view Map</p>}
        {showMap && (
          <iframe
            src={location}
            style={{
              border: "0",
            }}
            width={"100%"}
            height={"100%"}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </Box>
    </>
  );
}
