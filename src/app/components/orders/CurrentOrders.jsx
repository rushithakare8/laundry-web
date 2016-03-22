import React, { PropTypes } from 'react';
import ProgressCard from './ProgressCard';

const CurrentOrders = ({ orders, getCurrentOrders }) => {
  const children = orders ? orders.map((order, idx) => (
    <ProgressCard key={ idx } order={ order } />
  )) : null;
  return (
    <section>
      <button className="button" onClick={ getCurrentOrders }>Get Current Orders</button>
      { children }
    </section>
  );
};

CurrentOrders.propTypes = {
  orders: PropTypes.array,
  getCurrentOrders: PropTypes.func.isRequired,
};

export default CurrentOrders;
