/* global $ */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addServiceToCart, updateServiceOnCart, removeServiceFromCart } from '../redux/reducers/cart';
import ServiceCategory from '../components/orders/service/ServiceCategory';
import ServiceOption from '../components/orders/service/ServiceOption';

class NewOrderServices extends React.Component {
  componentDidMount() {
    $('.accordionServices').accordion();
  }
  render() {
    // Filtering the selected services (added to the cart)
    const servicesAdded = this.props.serviceTypes
      .filter(service => service.idServiceType)
      .map((service) => (
        <ServiceOption
          key={`SO${service.idServiceType}`} service={service} isRoot
          updateServiceOnCart={this.props.updateServiceOnCart}
          removeServiceFromCart={this.props.removeServiceFromCart}
        />
      ));
    // Service Categories comming from the BE
    const serviceCategories = this.props.serviceTypes
      .filter(service => service.idServiceCategory)
      .map((service) => (
        <ServiceCategory
          key={`SC${service.idServiceCategory}`} serviceCategory={service}
          addServiceToCart={this.props.addServiceToCart}
        />
      ));
    const addedTitle = servicesAdded.length > 0 ? (<h3>Added Services</h3>) : null;
    return (
      <div className="ui accordion accordionServices">
        <h3>Select Services</h3>
        {serviceCategories}
        {addedTitle}
        {servicesAdded}
      </div>
    );
  }
}

NewOrderServices.propTypes = {
  serviceTypes: PropTypes.array.isRequired,
  addServiceToCart: PropTypes.func.isRequired,
  updateServiceOnCart: PropTypes.func.isRequired,
  removeServiceFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  serviceTypes: state.serviceTypes,
});

export default connect((mapStateToProps), {
  addServiceToCart,
  updateServiceOnCart,
  removeServiceFromCart,
})(NewOrderServices);
