import React from 'react';
import PropTypes from 'prop-types';

const Errors = ({ errors }) => (
  <div>
    {errors && errors.length > 0 ? (
      <div className="ui error message">
        <div className="header">
          Please correct the following errors:
        </div>
        <ul className="list">
          {errors.map((e, k) => (<li key={k}>{e}</li>))}
        </ul>
      </div>
    ) : null}
  </div>
);

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Errors;
