/* global $ */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import EditPaymentForm from '../components/orders/payment/EditPaymentForm';

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
    // return addUserAddress(values, dispatch).then(() => this.setState({ addingPayment: false }));
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
    // this.props.updateCartInfo(values);
  }
  render() {
    const user = this.props.user;
    const selecting = !this.state.addingPayment ? (
      <div className="row">
        
      </div>
      <div className="row">
        <button className="ui fluid icon button" onClick={ this.openPaymentForm }>
          <i className="fa fa-credit-card"></i>
          <span className="Mstart(10px)">Add New Payment Method</span>
        </button>
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
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect((mapStateToProps), {
})(NewOrderPayments);
