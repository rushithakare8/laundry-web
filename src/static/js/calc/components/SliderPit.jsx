import React, { PropTypes } from 'react';

const SliderPit = ({ children }) => (
  <div className="rheostat-pit" style={{ width: (25 + (2 * children)) }}>
    <img src="/public/img/laundry-basket-blue.svg" alt="" />
  </div>
);

SliderPit.propTypes = {
  children: PropTypes.any,
};

export default SliderPit;
