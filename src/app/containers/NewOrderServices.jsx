/* global $ */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  addServiceToCart,
  removeServiceFromCart,
  addSpecOnCart,
  updateSpecOnCart,
  removeSpecOnCart,
} from '../data/actions/cart';
import ServiceCategory from '../components/orders/service/ServiceCategory';
import ServiceOption from '../components/orders/service/ServiceOption';

class NewOrderServices extends React.Component {
  componentDidMount() {
    $('.accordionServices').accordion();
  }
  render() {
    // Filtering the selected services (added to the cart)
    const servicesAdded = this.props.services.filter(service => service.idServiceType);
    // Service Categories comming from the BE
    const serviceCategories = this.props.services.filter(service => service.idServiceCategory);
    return (
      <div className="ui accordion accordionServices">
        <h3>Selecciona Servicios para Agregar</h3>
        {serviceCategories.map(service => (
          <ServiceCategory key={`SC${service.idServiceCategory}`} serviceCategory={service} {...this.props} />
        ))}
        {servicesAdded.length > 0 ? (<h3>Servicios Agregados</h3>) : null}
        {servicesAdded.map((service, idx) => (
          <ServiceOption key={`SO${service.idServiceType}${idx}`} service={service} isRoot {...this.props} />
        ))}
      </div>
    );
  }
}

NewOrderServices.propTypes = {
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  services: state.services,
  cart: state.cart,
});

export default connect((mapStateToProps), {
  addServiceToCart,
  removeServiceFromCart,
  addSpecOnCart,
  updateSpecOnCart,
  removeSpecOnCart,
})(NewOrderServices);
