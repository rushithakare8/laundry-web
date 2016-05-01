/* global $ */

import React, { PropTypes, Component } from 'react';
import ServiceSelector from './ServiceSelector';
import ServiceOption from './ServiceOption';

class ServiceCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { idServiceType: 0 };
    this.onServiceSelectChange = this.onServiceSelectChange.bind(this);
  }
  onServiceSelectChange(idServiceType) {
    this.setState({
      idServiceType,
    });
  }
  render() {
    const { serviceCategory } = this.props;
    const { idServiceType } = this.state;
    const selectedService = serviceCategory.serviceTypes
      .filter(service => parseInt(service.idServiceType, 0) === parseInt(idServiceType, 0))
      .map((service, idx) => (
        <ServiceOption
          key={idx} service={service} isRoot={false}
          addServiceToCart={this.props.addServiceToCart}
        />
      ));
    return (
      <div>
        <div className="title">
          <i className="fa fa-shopping-basket"></i>
          <span>{serviceCategory.name}</span>
        </div>
        <div className="content">
          <ServiceSelector
            services={serviceCategory.serviceTypes}
            id={serviceCategory.idServiceCategory}
            onChange={this.onServiceSelectChange}
          />
          {selectedService}
        </div>
      </div>
    );
  }
}

ServiceCategory.propTypes = {
  serviceCategory: PropTypes.object.isRequired,
  addServiceToCart: PropTypes.func.isRequired,
};

export default ServiceCategory;
