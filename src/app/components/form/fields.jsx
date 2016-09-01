import React, { PropTypes } from 'react';

const Input = ({ input, label, type, placeholder, meta: { touched, error } }) => (
  <div className="ui fluid input">
    <label htmlFor={input.name}>{label}</label>
    <input {...input} placeholder={placeholder} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Input;
