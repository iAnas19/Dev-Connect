import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  // const [sort, setSort] = useState(Oldest)
  let newestfirst = false;
  const onChange = () => {
    newestfirst = true;
  };

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <select name="sort" onChange={onChange}>
            <option value="Oldest">Oldest to newest</option>
            <option value="Newest">Newest to oldest</option>
          </select>
          {/* <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div> */}
          {newestfirst
            ? profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            : profiles
                .reverse()
                .map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))}
        </Fragment>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
