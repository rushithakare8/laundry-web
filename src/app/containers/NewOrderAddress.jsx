import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addUserAddress } from '../redux/reducers/user';
import { updateCartInfo } from '../redux/reducers/cart';
import AddressSelector from '../components/orders/address/AddressSelector';
import EditAddressForm from '../components/orders/address/EditAddressForm';

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
    const preferredPickup = user.addresses ?
      (<AddressSelector addresses={ user.addresses } inputName="idAddressPickup" onChange={ this.changeInfoHandler } />)
      : (<div>Please add an Address</div>);
    const preferredDelivery = user.addresses ?
      (<AddressSelector addresses={ user.addresses } inputName="idAddressDeliver" onChange={ this.changeInfoHandler } />)
      : (<div>Please add an Address</div>);
    const selecting = !this.state.addingAddress ? (
      <div className="ui column row">
        <h3>Pickup Address</h3>
        <div>
          { preferredPickup }
        </div>
        <h3>Pickup Time</h3>
        <div className="ui fluid input">
          <label htmlFor="address2"></label>
          <input type="datetime" name="pickupTime" placeholder="8:10" onChange={ this.changeInfoHandler } />
        </div>
        <h3>Delivery Address</h3>
        <div>
          { preferredDelivery }
        </div>
        <h3>Delivery Time</h3>
        <div className="ui fluid input">
          <label htmlFor="address2"></label>
          <input type="datetime" name="deliveryTime" placeholder="8:10" onChange={ this.changeInfoHandler } />
        </div>
        <div className="row">
          <button className="ui fluid icon button" onClick={ this.openAddressForm }>
            <i className="fa fa-map-marker"></i>
            <span className="Mstart(10px)">Add New Address</span>
          </button>
        </div>
      </div>
    ) : null;
    const addingAddress = this.state.addingAddress ? (
      <EditAddressForm initialValues={ { idClient: user.idClient } } cancelHandler={ this.cancelHandler } onSubmit={ this.onSubmit } />
    ) : null;
    return (
      <div>
        { selecting }
        { addingAddress }
      </div>
    );
  }
}

NewOrderAddress.propTypes = {
  user: PropTypes.object.isRequired,
  addUserAddress: PropTypes.func.isRequired,
  updateCartInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect((mapStateToProps), {
  addUserAddress,
  updateCartInfo,
})(NewOrderAddress);
