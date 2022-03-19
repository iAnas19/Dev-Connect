import React, { useState } from "react";
import axios from "axios";
import classnames from "classnames";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function onSubmit(e) {
    e.preventDefault();
    const User = {
      email: email,
      password: password,
    };

    axios
      .post("/api/users/login", User)
      .then((res) => console.log(res.data))
      .catch((err) => {
        const newError = err.response.data;
        setErrors(newError);
      });
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
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className={`form-control form-control mb-2 ${errors.email ? 'is-invalid' :  ''}`}
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
                  className={`form-control form-control mb-2 ${errors.password ? 'is-invalid' :  ''}`}
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

export default Login;