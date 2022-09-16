import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
      <Link to="/">
        <button className="btn btn-primary d-flex justify-content-center">
          {" "}
          DevConnect
        </button>
      </Link>
    </section>
  );
};

export default NotFound;
