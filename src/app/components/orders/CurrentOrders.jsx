import React, { PropTypes } from 'react';
import ProgressCard from './ProgressCard';

const CurrentOrders = ({ orders, getCurrentOrders }) => (
  <section>
    <button className="button" onClick={getCurrentOrders}>Get Current Orders</button>
    {orders ? orders.map((order, idx) => (
      <ProgressCard key={idx} order={order} />
    )) : null}
  </section>
);

CurrentOrders.propTypes = {
  orders: PropTypes.array,
  getCurrentOrders: PropTypes.func.isRequired,
};

export default CurrentOrders;
