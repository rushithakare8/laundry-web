import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addUserAddress } from '../redux/reducers/user';
import AddressSelector from '../components/orders/address/AddressSelector';
import EditAddressForm from '../components/orders/address/EditAddressForm';

class NewOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addingAddress: false };
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.openAddressForm = this.openAddressForm.bind(this);
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
  render() {
    const user = this.props.user;
    const preferredPickup = user.addresses ?
      (<AddressSelector addresses={ user.addresses } />) : (<div>Please add an Address</div>);
    const preferredDelivery = user.addresses ?
      (<AddressSelector addresses={ user.addresses } />) : (<div>Please add an Address</div>);
    const selecting = !this.state.addingAddress ? (
      <div>
        <h3>Pickup Address</h3>
        <div>
          { preferredPickup }
        </div>
        <h3>Delivery Address</h3>
        <div>
          { preferredDelivery }
        </div>
        <button className="ui icon button" onClick={ this.openAddressForm }>
          <i className="fa fa-map-marker"></i>
          <span className="Mstart(10px)">Add New Address</span>
        </button>
      </div>
    ) : null;
    const addingAddress = this.state.addingAddress ? (
      <EditAddressForm cancelHandler={ this.cancelHandler } />
    ) : null;
    return (
      <div>
        { selecting }
        { addingAddress }
      </div>
    );
  }
}

NewOrderView.propTypes = {
  addUserAddress: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect((mapStateToProps), {
  addUserAddress,
})(NewOrderView);
