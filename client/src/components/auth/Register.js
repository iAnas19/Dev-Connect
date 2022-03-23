import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter, useHistory } from "react-router-dom";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };

    props.registerUser(newUser, props.history);
  }

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      history.push("/dashboard");
    }

    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center mb-3">Sign Up</h1>
            <p className="lead text-center mb-3">
              Create your DevConnector account
            </p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className={`form-control form-control mb-2 ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

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
                <small className="form-text text-muted">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
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

              <div className="form-group mb-3">
                <input
                  type="password"
                  className={`form-control form-control mb-2 ${
                    errors.password2 ? "is-invalid" : ""
                  }`}
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block mt-4"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
