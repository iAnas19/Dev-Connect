import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { createProfile } from "../../redux/actions/profileAction";
import { withRouter } from "react-router-dom";
import InputGroup from "./../common/InputGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "./../common/SelectListGroup";
import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";

const CreateProfile = (props) => {
  const [state, setState] = useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [errors, setErrors] = useState({});

  const options = [
    { label: "* Select Professional Status", value: "0" },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];

  function onChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    const newProfile = {
      handle: state.handle,
      company: state.company,
      website: state.website,
      location: state.location,
      status: state.status,
      skills: state.skills,
      githubusername: state.githubusername,
      bio: state.bio,
      twitter: state.twitter,
      facebook: state.facebook,
      linkedin: state.linkedin,
      youtube: state.youtube,
      instagram: state.instagram,
    };
    props.createProfile(newProfile, props.history);
  }

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.errors]);

  let socialInputs;

  if (state.displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter fa-fw"
          value={state.twitter}
          onChange={onChange}
          error={errors.twitter}
        />

        <InputGroup
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook fa-fw"
          value={state.facebook}
          onChange={onChange}
          error={errors.facebook}
        />

        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin fa-fw"
          value={state.linkedin}
          onChange={onChange}
          error={errors.linkedin}
        />

        <InputGroup
          placeholder="YouTube Channel URL"
          name="youtube"
          icon="fab fa-youtube fa-fw"
          value={state.youtube}
          onChange={onChange}
          error={errors.youtube}
        />

        <InputGroup
          placeholder="Instagram Page URL"
          name="instagram"
          icon="fab fa-instagram fa-fw"
          value={state.instagram}
          onChange={onChange}
          error={errors.instagram}
        />
      </div>
    );
  }

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required field</small>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                name="handle"
                placeholder="* Profile handle"
                value={state.handle}
                type="text"
                onChange={onChange}
                info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                error={errors.handle}
              />

              <SelectListGroup
                name="status"
                placeholder="Status"
                value={state.status}
                onChange={onChange}
                info="Give us an idea of where you are at in your career."
                error={errors.status}
                options={options}
              />

              <TextFieldGroup
                name="company"
                placeholder="Company"
                value={state.company}
                type="text"
                onChange={onChange}
                info="Could be your own company or one you work for"
                error={errors.company}
              />

              <TextFieldGroup
                name="website"
                placeholder="Webiste"
                value={state.website}
                type="text"
                onChange={onChange}
                info="Could be your own or a company website"
                error={errors.website}
              />

              <TextFieldGroup
                name="location"
                placeholder="Location"
                value={state.location}
                type="text"
                onChange={onChange}
                info="City & state suggested (eg. Boston, MA)"
                error={errors.location}
              />

              <TextFieldGroup
                name="skills"
                placeholder="* Skills"
                value={state.skills}
                type="text"
                onChange={onChange}
                info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                error={errors.skills}
              />

              <TextFieldGroup
                name="githubusername"
                placeholder="Github Username"
                value={state.githubusername}
                type="text"
                onChange={onChange}
                info="If you want your latest repos and a Github link, include your username"
                error={errors.githubusername}
              />

              <TextAreaFieldGroup
                name="bio"
                placeholder="A short bio of yourself"
                value={state.bio}
                onChange={onChange}
                info="Tell us a little about yourself"
                error={errors.githubusername}
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setState((prevState) => ({
                      displaySocialInputs: !prevState.displaySocialInputs,
                    }));
                  }}
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//Comes from root reducer
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors.profileErrors,
});

// Reduced from action files
const mapDispatchToProps = {
  createProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateProfile));
