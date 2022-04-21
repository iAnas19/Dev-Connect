import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { addEducation } from "../../redux/actions/profileAction";

const AddEducation = (props) => {
  const [state, setState] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
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

    const eduData = {
      school: state.school,
      degree: state.degree,
      fieldofstudy: state.fieldofstudy,
      from: state.from,
      to: state.to,
      current: state.current,
      description: state.description,
    };

    props.addEducation(eduData, props.history);
  }

  function onChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function onCheck(e) {
    setState({
      disabled: !state.disabled,
      current: !state.current,
    });
  }

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={state.school}
                onChange={onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree or Certification"
                name="degree"
                value={state.degree}
                onChange={onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="* Field of Study"
                name="fieldofstudy"
                value={state.fieldofstudy}
                onChange={onChange}
                error={errors.fieldofstudy}
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
                placeholder="Program Description"
                name="description"
                value={state.description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the program that you were in"
              />
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
};

//Comes from root reducer
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors.dashboardErrors,
});

// Reduced from action files
const mapDispatchToProps = { addEducation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
