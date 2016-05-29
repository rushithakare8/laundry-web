import React, { PropTypes } from 'react';

const Errors = ({ errors }) => (
  <div className="ui error message">
    <div className="header">
      Please correct the following errors:
    </div>
    <ul className="list">
      {errors.map((e, k) => (<li key={k}>{e}</li>))}
    </ul>
  </div>
);

Errors.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default Errors;
