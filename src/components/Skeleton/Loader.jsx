import React from "react";
import { RotateLoader } from "react-spinners";

function Loader() {
  const option = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    marginTop: "8rem",
    marginBottom: "2rem",
  };
  return (
    <>
      <RotateLoader color="skyblue" cssOverride={option} />
    </>
  );
}

export default Loader;
