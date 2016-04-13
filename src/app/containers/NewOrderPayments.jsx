/* global $ */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateCartInfo } from '../redux/reducers/cart';
import { addUserPaymentInfo } from '../redux/reducers/user';
import EditPaymentForm from '../components/orders/payment/EditPaymentForm';
import PaymentInfoSelector from '../components/orders/payment/PaymentInfoSelector';

class NewOrderPayments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addingPayment: false };
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.openPaymentForm = this.openPaymentForm.bind(this);
    this.changeInfoHandler = this.changeInfoHandler.bind(this);
  }
  onSubmit(values, dispatch) {
    return addUserPaymentInfo(values, dispatch).then(() => this.setState({ addingPayment: false }));
  }
  cancelHandler() {
    this.setState({
      addingPayment: false,
    });
  }
  openPaymentForm() {
    this.setState({
      addingPayment: true,
    });
  }
  changeInfoHandler(event) {
    const values = {};
    values[event.target.name] = event.target.value;
    this.props.updateCartInfo(values);
  }
  render() {
    const user = this.props.user;
    const preferredPickup = user.paymentInfos ?
      (<PaymentInfoSelector paymentInfos={ user.paymentInfos } onChange={ this.changeInfoHandler } />)
      : (<div>Please add a Card</div>);
    const selecting = !this.state.addingPayment ? (
      <div className="row">
        { preferredPickup }
        <div className="row">
          <button className="ui fluid icon button" onClick={ this.openPaymentForm }>
            <i className="fa fa-credit-card"></i>
            <span className="Mstart(10px)">Add New Payment Method</span>
          </button>
        </div>
      </div>
    ) : null;
    const addingPayment = this.state.addingPayment ? (
      <EditPaymentForm initialValues={ { idClient: user.idClient } } cancelHandler={ this.cancelHandler } onSubmit={ this.onSubmit } />
    ) : null;
    return (
      <div className="ui">
        <h3>Payment Method</h3>
        { selecting }
        { addingPayment }
      </div>
    );
  }
}

NewOrderPayments.propTypes = {
  user: PropTypes.object.isRequired,
  updateCartInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect((mapStateToProps), {
  updateCartInfo,
})(NewOrderPayments);
