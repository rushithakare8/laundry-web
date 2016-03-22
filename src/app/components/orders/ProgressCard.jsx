import React, { PropTypes } from 'react';

const ProgressCard = ({ order }) => (
  <section className="">
    <span className="">${ order.price }</span>
  </section>
);

ProgressCard.propTypes = {
  order: PropTypes.object.isRequired,
};

export default ProgressCard;
