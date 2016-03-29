import React, { PropTypes } from 'react';
import SpecOptions from './SpecOptions';

const ServiceOption = ({ service }) => {
  const specs = service.specs ? service.specs.map((spec, idx) => (
    <SpecOptions key={ idx } spec={ spec } />
  )) : null;
  return (
    <div>
      <div className="title">
        <span>{ service.name }</span>
      </div>
      <div>{ service.description }, ${ service.price }</div>
      <div className="">
        <div>
          <button className="ui icon button"><i className="fa fa-plus"></i></button>
          <button className="ui icon button"><i className="fa fa-minus"></i></button>
        </div>

        <div className="ui grid">
          { specs }
        </div>
      </div>
    </div>
  );
};

ServiceOption.propTypes = {
  service: PropTypes.object,
};

export default ServiceOption;
