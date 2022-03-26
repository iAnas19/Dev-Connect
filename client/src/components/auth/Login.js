import React, { useState, useEffect } from "react";
import { loginUser } from "../../redux/actions/authAction";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "./../common/TextFieldGroup";

const Login = (props) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function onSubmit(e) {
    e.preventDefault();
    const User = {
      email: email,
      password: password,
    };

    props.loginUser(User);
  }

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }

    return () => {
      setErrors({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.errors]);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  if (props.auth.isAuthenticated) {
    history.push("/dashboard");
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center mb-3">Log In</h1>
            <p className="lead text-center mb-3">
              Sign in to your DevConnector account
            </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                name="email"
                placeholder="Email Address"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <TextFieldGroup
                name="password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block mt-4"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//Comes from root reducer
const mapStateToProps = (state) => {
  return {
    errors: state.errors.loginErrors,
    auth: state.auth,
  };
};

// Reduced from auth files
const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
