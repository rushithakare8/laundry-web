import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  checkout,
  setUser,
} from '../data/reducers/cart';
import Errors from '../components/Errors';
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
    const { errors } = this.props;
    return (
      <div className="ui container">
        <NewOrderSummary />
        {errors.length > 0 ? (<Errors errors={errors} />) : null}
        <NewOrderAddress user={this.props.user} />
        <NewOrderServices services={this.props.services} />
        <NewOrderPayments user={this.props.user} />
        <NewOrderComments />
        <div className="ui column row">
          <button className="fluid ui icon button" onClick={this.checkoutHandler}>
            <i className="fa fa-shopping-cart"></i>
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
  errors: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
  errors: state.errors,
  services: state.services,
});

export default connect((mapStateToProps), {
  setUser,
  checkout,
})(NewOrderView);
