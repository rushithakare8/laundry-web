import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateCartInfo } from '../data/actions/cart';
import { addUserPaymentInfo } from '../data/actions/user';
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
    const { idClient, stripeCustumerId, paymentInfos } = this.props.user;
    const initialValues = { idClient, stripeCustumerId };
    return (
      <div className="ui">
        <h3>Metodo de Pago</h3>
        {!this.state.addingPayment ? (
          <div className="row">
            {paymentInfos ? (
              <PaymentInfoSelector paymentInfos={paymentInfos} onChange={this.changeInfoHandler} />
            ) : (
              <div>No tienes metodos de pago registrados</div>
            )}
            <div className="row">
              <button className="ui fluid icon button" onClick={this.openPaymentForm}>
                <i className="fa fa-credit-card" />
                <span className="Mstart(10px)">Registra un Nuevo Metodo de Pago</span>
              </button>
            </div>
          </div>
        ) : null}
        {this.state.addingPayment ? (
          <EditPaymentForm initialValues={initialValues} cancelHandler={this.cancelHandler} onSubmit={this.onSubmit} />
        ) : null}
      </div>
    );
  }
}

NewOrderPayments.propTypes = {
  user: PropTypes.object.isRequired,
  updateCartInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect((mapStateToProps), {
  updateCartInfo,
})(NewOrderPayments);
