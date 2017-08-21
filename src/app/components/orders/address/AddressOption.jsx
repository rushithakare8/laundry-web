import React from 'react';
import PropTypes from 'prop-types';

const AddressOption = ({ address }) => (
  <div className="item" data-value={address.idAddress} >
    <div>
      <div>{address.address}</div>
      <div>{address.address2}</div>
      <div>{address.city}, {address.state}, {address.zipCode}</div>
      <div>{address.country}</div>
    </div>
  </div>
);

AddressOption.propTypes = {
  address: PropTypes.object.isRequired,
};

export default AddressOption;
