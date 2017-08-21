import React from 'react';
import PropTypes from 'prop-types';
import ProgressCard from './ProgressCard';

const CurrentOrders = ({ orders, getOrders }) => (
  <section>
    <button className="button" onClick={getOrders}>Get Current Orders</button>
    {orders ? orders.map((order, idx) => (
      <ProgressCard key={idx} order={order} />
    )) : null}
  </section>
);

CurrentOrders.defaultProps = {
  orders: [],
};

CurrentOrders.propTypes = {
  orders: PropTypes.array,
  getOrders: PropTypes.func.isRequired,
};

export default CurrentOrders;
