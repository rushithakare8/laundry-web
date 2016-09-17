import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  checkout,
  setUser,
} from '../data/actions/cart';
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
  componentDidMount() {
    const { user } = this.props;
    this.props.setUser(user.idClient);
  }
  checkoutHandler() {
    const { cart } = this.props;
    this.props.checkout(cart);
  }
  render() {
    return (
      <div className="ui container">
        <NewOrderSummary />
        <NewOrderAddress />
        <NewOrderServices />
        <NewOrderPayments />
        <NewOrderComments />
        <div className="ui column row">
          <button className="fluid ui icon button" onClick={this.checkoutHandler}>
            <i className="fa fa-shopping-cart" />
            <span className="Mstart(10px)">Completar Orden</span>
          </button>
        </div>
      </div>
    );
  }
}

NewOrderView.propTypes = {
  cart: PropTypes.object,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
});

export default connect((mapStateToProps), {
  setUser,
  checkout,
})(NewOrderView);
