import React, { PropTypes } from 'react';
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

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object),
  getOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  orders: state.orders,
});

export default connect((mapStateToProps), {
  getOrders,
})(HomeView);
