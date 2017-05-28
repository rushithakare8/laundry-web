/* global $*/

import React from 'react';
import PropTypes from 'prop-types';
import AddressOption from './AddressOption';

class AddressSelector extends React.Component {
  componentDidMount() {
    const { inputName, addresses } = this.props;
    const dropdownElem = $(`#${inputName}`);
    dropdownElem.dropdown({
      onChange: (value) => {
        this.props.onChange({
          target: {
            name: this.props.inputName,
            value,
          },
        });
      },
    });
    dropdownElem.dropdown('set selected', addresses[0].idAddress);
  }
  render() {
    return (
      <section>
        <div id={this.props.inputName} className="ui fluid selection dropdown">
          <input type="hidden" name={this.props.inputName} />
          <div className="default text">Direcciones Disponibles</div>
          <i className="dropdown icon" />
          <div className="menu">
            {this.props.addresses.map((address, idx) => (
              <AddressOption address={address} key={idx} />
            ))}
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
