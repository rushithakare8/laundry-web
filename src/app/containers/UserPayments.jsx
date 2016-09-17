import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import {
  addUserPaymentInfo,
  deleteUserPaymentInfo,
} from '../data/actions/user';
import EditPaymentForm from '../components/orders/payment/EditPaymentForm';

const brandToFA = {
  Visa: 'visa',
  MasterCard: 'mastercard',
  'American Express': 'amex',
  Discover: 'discover',
  'Diners Club': 'diners-club',
  JCB: 'jcb',
};

class UserPayments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardId: 0,
      new: true,
      editing: false,
    };
    this.addUserPaymentHandler = this.addUserPaymentHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.addNewHandler = this.addNewHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  addUserPaymentHandler(values, dispatch) {
    return addUserPaymentInfo(values, dispatch).then(() => this.setState({ editing: false }));
  }
  cancelHandler() {
    this.setState({
      cardId: 0,
      new: true,
      editing: false,
    });
  }
  addNewHandler() {
    this.setState({
      new: true,
      editing: true,
    });
  }
  deleteHandler(customerId, cardId) {
    this.props.deleteUserPaymentInfo(customerId, cardId);
  }
  render() {
    const { user } = this.props;
    const { paymentInfos, stripeCustumerId } = user;
    const newValues = { idClient: user.idClient, stripeCustumerId: user.stripeCustumerId };
    const editValues = !this.state.new && this.getEditPaymentValues(this.state.cardId);
    const initialValues = this.state.new ? newValues : editValues;
    return (
      <div className="ui">
        <h3>Opciones de Pago Registradas</h3>
        {paymentInfos && paymentInfos.map(token => (
          <div className="row align-justify" key={token.id}>
            <div className="small-4 columns">
              <span className="Pend(7px)"><i className={cx('fa', `fa-cc-${brandToFA[token.brand]}`)} /></span>
              <span>XXXX-XXXX-XXXX-</span>
              <span>{token.last4}</span>
            </div>
            <div className="small-4 columns">
              <button className="ui icon button" type="submit" onClick={() => this.deleteHandler(stripeCustumerId, token.id)} >
                <i className="fa fa-minus" />
              </button>
            </div>
          </div>
        ))}
        {!this.state.editing ? (
          <div className="column Ta(e) Mb(14px)">
            <button className="ui icon button" type="submit" onClick={this.addNewHandler} >
              <i className="fa fa-plus" />
              <span className="Mstart(10px)">Add New Payment</span>
            </button>
          </div>
        ) : null}
        {this.state.editing ? (
          <EditPaymentForm initialValues={initialValues} cancelHandler={this.cancelHandler} onSubmit={this.addUserPaymentHandler} />
        ) : null}
      </div>
    );
  }
}

UserPayments.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUserPaymentInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect((mapStateToProps), {
  deleteUserPaymentInfo,
})(UserPayments);
