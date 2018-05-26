import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  //props for the components
  name,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  options
}) => {
  const selectOptions = options.map((
    option //map through each options and create an option tag and store it in selectOptions variable
  ) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        options={options}
      >
        {selectOptions}
      </select>

      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error} </div>}
    </div>
  );
};
//using proptypes
SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  options: PropTypes.array.isRequired
};

SelectListGroup.defaultProps = {
  //set the default prop for the component
  type: "text"
};
export default SelectListGroup;
