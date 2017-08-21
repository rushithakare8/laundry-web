import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addUserAddress,
  deleteUserAddress,
  updateUserAddress,
} from '../data/actions/user';
import EditAddressForm from '../components/orders/address/EditAddressForm';

class UserAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new: true,
      editing: false,
      idAddress: 0,
    };
    this.addUserAddressHandler = this.addUserAddressHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.addNewHandler = this.addNewHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
  }
  getSelectedValues(idAddress) {
    const { user } = this.props;
    const { addresses } = user;
    const selectedAddress = addresses.filter(addrs => addrs.idAddress === idAddress)[0];
    return Object.assign({}, selectedAddress, { idClient: user.idClient });
  }
  addUserAddressHandler(values, dispatch) {
    const { idAddress } = values;
    if (idAddress) {
      return updateUserAddress(values, dispatch).then(() => this.setState({ editing: false }));
    }
    return addUserAddress(values, dispatch).then(() => this.setState({ editing: false }));
  }
  cancelHandler() {
    this.setState({
      new: true,
      editing: false,
      idAddress: 0,
    });
  }
  addNewHandler() {
    this.setState({
      new: true,
      editing: true,
    });
  }
  editHandler(idAddress) {
    this.setState({
      new: false,
      editing: true,
      idAddress,
    });
  }
  deleteHandler(idAddress) {
    this.props.deleteUserAddress(idAddress);
  }
  render() {
    const { user } = this.props;
    const { addresses } = user;
    const newValues = { idClient: user.idClient };
    const editValues = !this.state.new && this.getSelectedValues(this.state.idAddress);
    const initialValues = this.state.new ? newValues : editValues;
    return (
      <div className="ui">
        <h3>Direcciones Registradas</h3>
        {addresses && addresses.map(address => (
          <div key={address.idAddress} className="row align-justify">
            <div className="small-4 columns">
              <div>{address.address} {address.address2}</div>
              <div>{address.city}, {address.state}, {address.zipCode}</div>
              <div>{address.country}</div>
            </div>
            {!this.state.editing ? (
              <div className="small-4 columns">
                <button className="ui icon button" type="submit" onClick={() => this.deleteHandler(address.idAddress)} >
                  <i className="fa fa-minus" />
                </button>
                <button className="ui icon button" type="submit" onClick={() => this.editHandler(address.idAddress)} >
                  <i className="fa fa-pencil" />
                </button>
              </div>
            ) : null}
          </div>
        ))}
        {!this.state.editing ? (
          <div className="column Ta(e) Mb(14px)">
            <button className="ui icon button" type="submit" onClick={this.addNewHandler} >
              <i className="fa fa-plus" />
              <span className="Mstart(10px)">Add New Addresses</span>
            </button>
          </div>
        ) : null}
        {this.state.editing ? (
          <EditAddressForm initialValues={initialValues} cancelHandler={this.cancelHandler} onSubmit={this.addUserAddressHandler} />
        ) : null}
      </div>
    );
  }
}

UserAddress.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUserAddress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect((mapStateToProps), {
  deleteUserAddress,
})(UserAddress);
