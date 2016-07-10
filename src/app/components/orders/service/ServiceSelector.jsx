/* global $ */

import React, { PropTypes, Component } from 'react';

class ServiceSelector extends Component {
  componentDidMount() {
    $(`#dropdownService${this.props.id}`).dropdown({
      onChange: (val) => {
        this.props.onChange(val);
      },
    });
  }
  render() {
    return (
      <div id={`dropdownService${this.props.id}`} className="ui fluid selection dropdown">
        <input type="hidden" name="idServiceType" />
        <div className="default text">Servicios</div>
        <i className="dropdown icon"></i>
        <div className="menu">
          {this.props.services.map((service, idx) => (
            <div key={idx} className="item" data-value={service.idServiceType} >
              <div>{service.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ServiceSelector.propTypes = {
  services: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default ServiceSelector;
