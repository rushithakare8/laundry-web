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
    return (
      <div>
        <div className="title">
          <i className="fa fa-shopping-basket" />
          <span>{serviceCategory.name}</span>
        </div>
        <div className="content">
          <ServiceSelector
            services={serviceCategory.serviceTypes}
            id={serviceCategory.idServiceCategory}
            onChange={this.onServiceSelectChange}
          />
          {serviceCategory.serviceTypes
            .filter(service => parseInt(service.idServiceType, 0) === parseInt(idServiceType, 0))
            .map((service, idx) => (
              <ServiceOption key={idx} service={service} isRoot={false} {...this.props} />
            ))}
        </div>
      </div>
    );
  }
}

ServiceCategory.propTypes = {
  serviceCategory: PropTypes.object.isRequired,
};

export default ServiceCategory;
