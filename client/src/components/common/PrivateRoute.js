import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = { auth: PropTypes.object.isRequired };

//Comes from root reducer
const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, null)(PrivateRoute);
