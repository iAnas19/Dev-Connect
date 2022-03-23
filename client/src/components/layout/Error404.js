import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Error404 = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      history.push("/dashboard");
    }
  });
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

Error404.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//Comes from root reducer
const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Error404);
