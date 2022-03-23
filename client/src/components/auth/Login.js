import React, { useState, useEffect } from "react";
import { loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

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
              <div className="form-group mb-3">
                <input
                  type="email"
                  className={`form-control form-control mb-2 ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group mb-3">
                <input
                  type="password"
                  className={`form-control form-control mb-2 ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
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
    errors: state.errors,
    auth: state.auth,
  };
};

// Reduced from auth files
const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
