import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";
import TextFieldGroup from "../common/TextFieldGroup";

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
              <TextFieldGroup
                name="name"
                placeholder="Name"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />

              <TextFieldGroup
                name="email"
                placeholder="Email Address"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                info="This site uses Gravatar so if you want a profile image, use a
                Gravatar email"
              />

              <TextFieldGroup
                name="password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              <TextFieldGroup
                name="passwor2d"
                placeholder="Confirm Password"
                value={password2}
                type="password"
                onChange={(e) => setPassword2(e.target.value)}
                error={errors.password2}
              />
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

//Comes from root reducer
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors.signupErrors,
  };
};

// Reduced from auth files
const mapDispatchToProps = {
  registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
