import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../../redux/actions/profileAction";
import Loading from "../common/Loading";
import { Link } from "react-router-dom";

const Dasboard = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);

  const { user } = props.auth;
  const { profile, loading } = props.profile;

  let dashboardContent;

  if (profile === null || (loading && props.auth.isAuthenticated)) {
    dashboardContent = <Loading />;
  } else {
    if (Object.keys(profile).length > 0) {
      //Check if user has a profile
      dashboardContent = <h4>Display Profile</h4>;
    } else {
      //User is logged in but has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Weclome {user.name}</p>
          <p>You have not yet set up your profile, please add some info.</p>
          <Link to="/create-profile" className="btn btn-lg btn-primary">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 mb-5">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Dasboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

//Comes from root reducer
const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile,
});

// Reduced from action files
const mapDispatchToProps = {
  getCurrentProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dasboard);
