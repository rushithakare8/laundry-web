import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCurrentOrders as getCurrentOrdersFunc } from '../redux/reducers/orders';
import CurrentOrders from '../components/orders/CurrentOrders';

export const HomeView = ({ orders, getCurrentOrders }) => (
  <div className="container text-center">
    <CurrentOrders orders={ orders } getCurrentOrders={ getCurrentOrders } />
  </div>
);

HomeView.propTypes = {
  getCurrentOrders: PropTypes.func.isRequired,
  orders: PropTypes.array,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  user: state.user,
});

export default connect((mapStateToProps), {
  getCurrentOrders: getCurrentOrdersFunc,
})(HomeView);
