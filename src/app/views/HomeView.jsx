import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../data/actions/orders';
import CurrentOrders from '../components/orders/CurrentOrders';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.getOrdersHandler = this.getOrdersHandler.bind(this);
  }
  getOrdersHandler() {
    const { user } = this.props;
    this.props.getOrders(user.idClient);
  }
  render() {
    const { orders } = this.props;
    return (
      <div className="container text-center">
        <CurrentOrders orders={orders} getOrders={this.getOrdersHandler} />
      </div>
    );
  }
}

HomeView.defaultProps = {
  orders: [],
};

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  user: state.user,
  orders: state.orders,
});

export default connect((mapStateToProps), {
  getOrders,
})(HomeView);
