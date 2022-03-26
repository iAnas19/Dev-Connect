import React from "react";
import loading from "./loading.gif";

const Loading = () => {
  return (
    <div>
      <img
        src={loading}
        style={{ width: "80px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

export default Loading;
