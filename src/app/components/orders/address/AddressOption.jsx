import React, { PropTypes } from 'react';

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
  address: PropTypes.object,
};

export default AddressOption;
