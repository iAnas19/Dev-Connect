import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { addExperience } from "../../redux/actions/profileAction";

const AddExperience = (props) => {
  const [state, setState] = useState({
    company: "",
    title: "",
    location: "",
    to: "",
    from: "",
    current: false,
    description: "",
    disabled: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  function onSubmit(e) {
    e.preventDefault();

    const expData = {
      company: state.company,
      title: state.title,
      location: state.location,
      from: state.from,
      to: state.to,
      current: state.current,
      description: state.description,
    };

    props.addExperience(expData, props.history);
  }

  function onChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function onCheck(e) {
    setState({
      ...state,
      disabled: !state.disabled,
      current: !state.current,
    });
  }

  return (
    <div className="section add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Your Experience</h1>
            <p className="lead text-center">
              Add any developer/programming positions that you have had in the
              past
            </p>
            <small className="d-block pb-3">* = required field</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={state.company}
                onChange={onChange}
                error={errors.company}
              />

              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={state.title}
                onChange={onChange}
                error={errors.title}
              />

              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={state.location}
                onChange={onChange}
                error={errors.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={state.from}
                onChange={onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={state.to}
                onChange={onChange}
                error={errors.to}
                disabled={state.disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={state.current}
                  checked={state.current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Job Description"
                name="description"
                value={state.description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the position"
              />
              <input
                type="submit"
                value="Save"
                className="btn btn-primary btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
};

//Comes from root reducer
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors.dashboardErrors,
});

// Reduced from action files
const mapDispatchToProps = { addExperience };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));
