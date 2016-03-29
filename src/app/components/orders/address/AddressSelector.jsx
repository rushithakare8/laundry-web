/* global $*/

import React, { PropTypes } from 'react';
import AddressOption from './AddressOption';

class AddressSelector extends React.Component {
  componentDidMount() {
    $('.ui.dropdown').dropdown();
  }
  render() {
    const dropDownAddresses = this.props.addresses.map((address, idx) => (
      <AddressOption address={ address } key={ idx } />
    ));
    return (
      <section>
        <div className="ui selection dropdown">
          <input type="hidden" name="idAddress" />
          <div className="default text">Address</div>
          <i className="dropdown icon"></i>
          <div className="menu">
            { dropDownAddresses }
          </div>
        </div>
      </section>
    );
  }
}

AddressSelector.propTypes = {
  addresses: PropTypes.array,
};

export default AddressSelector;
