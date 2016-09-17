import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addUserAddress } from '../data/actions/user';
import { updateCartInfo } from '../data/actions/cart';
import AddressSelector from '../components/orders/address/AddressSelector';
import EditAddressForm from '../components/orders/address/EditAddressForm';
import DateTimeSelector from '../components/orders/DateTimeSelector';

class NewOrderAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addingAddress: false };
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.openAddressForm = this.openAddressForm.bind(this);
    this.changeInfoHandler = this.changeInfoHandler.bind(this);
  }
  onSubmit(values, dispatch) {
    return addUserAddress(values, dispatch).then(() => this.setState({ addingAddress: false }));
  }
  cancelHandler() {
    this.setState({
      addingAddress: false,
    });
  }
  openAddressForm() {
    this.setState({
      addingAddress: true,
    });
  }
  changeInfoHandler(event) {
    const values = {};
    values[event.target.name] = event.target.value;
    this.props.updateCartInfo(values);
  }
  render() {
    const user = this.props.user;
    return (
      <div>
        {!this.state.addingAddress ? (
          <div className="ui column row">
            <h3>Direccion para recojer</h3>
            <div>
              {user.addresses ? (
                <AddressSelector addresses={user.addresses} inputName="idAddressPickup" onChange={this.changeInfoHandler} />
              ) : (
                <div>No tienes direcciones registradas</div>
              )}
            </div>
            <h3>Hora para recojer</h3>
            <DateTimeSelector fieldName="pickUpDate" onChange={this.changeInfoHandler} />
            <h3>Direccion de entrega</h3>
            <div>
              {user.addresses ? (
                <AddressSelector addresses={user.addresses} inputName="idAddressDeliver" onChange={this.changeInfoHandler} />
              ) : (
                <div>No tienes direcciones registradas</div>
              )}
            </div>
            <h3>Hora para entrega</h3>
            <DateTimeSelector fieldName="deliveryDate" isPickup={false} onChange={this.changeInfoHandler} />
            <div className="row">
              <button className="ui fluid icon button" onClick={this.openAddressForm}>
                <i className="fa fa-map-marker" />
                <span className="Mstart(10px)">Registra una Nueva Direccion</span>
              </button>
            </div>
          </div>
        ) : null}
        {this.state.addingAddress ? (
          <EditAddressForm initialValues={{ idClient: user.idClient }} cancelHandler={this.cancelHandler} onSubmit={this.onSubmit} />
        ) : null}
      </div>
    );
  }
}

NewOrderAddress.propTypes = {
  user: PropTypes.object.isRequired,
  updateCartInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect((mapStateToProps), {
  updateCartInfo,
})(NewOrderAddress);
