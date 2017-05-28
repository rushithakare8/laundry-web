import React, { PropTypes } from 'react';
import AmountSlider from './AmountSlider';

const ServiceSpecs = ({ specs, cartSpecs, subtotal, onSpecChange, onAmountChange }) => {
  const specsRender = cartSpecs || specs;
  return (
    <div className="row column small-12 My(7px)">
      {specsRender && specsRender.map(spec => (
        <AmountSlider key={spec.idSpecs} spec={spec} subtotal={subtotal} onSpecChange={onSpecChange} onAmountChange={onAmountChange} />
      ))}
    </div>
  );
};

ServiceSpecs.defaultProps = {
  cartSpecs: [],
};

ServiceSpecs.propTypes = {
  cartSpecs: PropTypes.array,
  subtotal: PropTypes.number.isRequired,
  specs: PropTypes.array.isRequired,
  onSpecChange: PropTypes.func.isRequired,
  onAmountChange: PropTypes.func.isRequired,
};

export default ServiceSpecs;
