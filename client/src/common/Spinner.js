import React from "react";
import spinner from "./spinner.gif";
const Spinner = () => {
  return (
    <div style={{ width: "15px", margin: "auto", display: "block" }}>
      <img src={spinner} alt="loading " />
    </div>
  );
};
export default Spinner;
