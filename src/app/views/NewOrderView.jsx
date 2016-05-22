import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkout } from '../data/reducers/cart';
import NewOrderAddress from '../containers/NewOrderAddress';
import NewOrderServices from '../containers/NewOrderServices';
import NewOrderPayments from '../containers/NewOrderPayments';
import NewOrderSummary from '../containers/NewOrderSummary';
import NewOrderComments from '../containers/NewOrderComments';

class NewOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openedMenu: false };
    this.checkoutHandler = this.checkoutHandler.bind(this);
  }
  checkoutHandler() {
    const { cart } = this.props;
    this.props.checkout(cart);
  }
  render() {
    return (
      <div className="ui container">
        <NewOrderSummary />
        <NewOrderAddress user={this.props.user} />
        <NewOrderServices serviceTypes={this.props.serviceTypes} />
        <NewOrderPayments user={this.props.user} />
        <NewOrderComments />
        <div className="ui column row">
          <button className="fluid ui icon button" onClick={this.checkoutHandler}>
            <i className="fa fa-shopping-cart"></i>
            <span className="Mstart(10px)">Checkout</span>
          </button>
        </div>
      </div>
    );
  }
}

NewOrderView.propTypes = {
  cart: PropTypes.object,
  user: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  serviceTypes: PropTypes.array.isRequired,
  checkout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
  errors: state.errors,
  serviceTypes: state.serviceTypes,
});

export default connect((mapStateToProps), {
  checkout,
})(NewOrderView);
