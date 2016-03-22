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
        <div className="ui dropdown">
          <input type="hidden" name="gender" />
          <div className="default text">Address</div>
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
