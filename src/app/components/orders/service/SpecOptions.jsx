import React, { PropTypes } from 'react';

const SpecOptions = ({ spec }) => (
  <div className="three column row">
    <div className="column">
      { spec.description }
    </div>
    <div className="column">
      ${ spec.price }
    </div>
    <div className="column">
      <button className="ui icon button"><i className="fa fa-plus"></i></button>
      <button className="ui icon button"><i className="fa fa-minus"></i></button>
    </div>
  </div>
);

SpecOptions.propTypes = {
  spec: PropTypes.object,
};

export default SpecOptions;
