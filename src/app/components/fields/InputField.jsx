import React, { PropTypes } from 'react';
import cx from 'classnames';

const InputField = ({ input, id, label, type, placeholder, meta: { touched, error } }) => (
  <div className={cx('ui fluid field input', { error: touched && error })}>
    <label htmlFor={input.name}>{label}</label>
    <input {...input} id={id} placeholder={placeholder} type={type} />
  </div>
);

InputField.defaultProps = {
  id: '',
  label: '',
  placeholder: '',
};

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputField;
