import React from 'react';
import PropTypes from 'prop-types';

const ProgressCard = ({ order }) => (
  <section className="">
    <span className="">${order.price}</span>
  </section>
);

ProgressCard.propTypes = {
  order: PropTypes.object.isRequired,
};

export default ProgressCard;
