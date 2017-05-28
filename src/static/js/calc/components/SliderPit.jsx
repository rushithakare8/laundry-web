import React from 'react';
import PropTypes from 'prop-types';

const SliderPit = ({ children }) => (
  <div className="rheostat-pit" style={{ width: (10 + (2 * children)) }}>
    <img src="/public/img/laundry-basket-blue.svg" alt="" />
  </div>
);

SliderPit.propTypes = {
  children: PropTypes.number.isRequired,
};

export default SliderPit;
