import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getOrders as getOrdersFunc } from '../data/reducers/orders';
import CurrentOrders from '../components/orders/CurrentOrders';

export const HomeView = ({ orders, getOrders }) => (
  <div className="container text-center">
    <CurrentOrders orders={orders} getOrders={getOrders} />
  </div>
);

HomeView.propTypes = {
  getOrders: PropTypes.func.isRequired,
  orders: PropTypes.array,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  user: state.user,
});

export default connect((mapStateToProps), {
  getOrders: getOrdersFunc,
})(HomeView);
