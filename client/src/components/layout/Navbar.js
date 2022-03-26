import React from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutCurrentUser } from "./../../redux/actions/authAction";
import { clearCurrentProfile } from "./../../redux/actions/profileAction";

const Navbar = (props) => {
  const history = useHistory();
  const { isAuthenticated, user } = props.auth;

  function onLogout(e) {
    e.preventDefault();
    props.logoutCurrentUser();
    props.clearCurrentProfile();
    history.push("/");
  }

  const authLinks = (
    <ul className="navbar-nav ms-auto">
      {" "}
      <li className="nav-item">
        {" "}
        <a href="/#" onClick={onLogout} className="nav-link">
          {" "}
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: "25px", marginRight: "15px" }}
            className="rounded-circle"
            title="You must have Gravatar connected to your email to display your avatar."
          />{" "}
          Logout{" "}
        </a>{" "}
      </li>{" "}
      {/* <li className="nav-item"> <button className="btn btn-outline-danger btn btn-block" onClick={onLogout} > Logout </button> </li> */}{" "}
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          DevConnector
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/developers" className="nav-link">
                {" "}
                Developers
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logoutCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

// Reduced from reducers
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

// Reduced from auth files
const mapDispatchToProps = {
  logoutCurrentUser,
  clearCurrentProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
