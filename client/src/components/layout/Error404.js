import React from "react";
import { Link } from "react-router-dom";

const Error404 = (props) => {
  return (
    <div className="container">
      <h1>404 - Not Found!</h1>
      <Link to="/">
        <button type="button" className="btn btn-primary">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default Error404;
