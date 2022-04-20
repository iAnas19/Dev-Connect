import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  onChange,
  icon,
  type,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text h-100">
          <i className={icon}></i>
        </span>
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
  type: "text",
};

export default InputGroup;
