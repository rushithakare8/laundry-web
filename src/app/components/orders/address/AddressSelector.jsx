/* global $*/

import React, { PropTypes } from 'react';
import AddressOption from './AddressOption';

class AddressSelector extends React.Component {
  componentDidMount() {
    $(`#${this.props.inputName}`).dropdown({
      onChange: (value) => {
        this.props.onChange({
          target: {
            name: this.props.inputName,
            value,
          },
        });
      },
    });
  }
  render() {
    const dropDownAddresses = this.props.addresses.map((address, idx) => (
      <AddressOption address={address} key={idx} />
    ));
    return (
      <section>
        <div id={this.props.inputName} className="ui fluid selection dropdown">
          <input type="hidden" name={this.props.inputName} />
          <div className="default text">Address</div>
          <i className="dropdown icon"></i>
          <div className="menu">
            {dropDownAddresses}
          </div>
        </div>
      </section>
    );
  }
}

AddressSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
  inputName: PropTypes.string.isRequired,
};

export default AddressSelector;
