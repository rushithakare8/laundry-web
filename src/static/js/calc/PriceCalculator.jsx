/* global $ */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getServices,
  updateService,
  updateServiceType,
} from './data/reducers/services';
import {
  updateCartSpec,
} from './data/reducers/cart';
import Services from './components/Services';
import ServiceSpecs from './components/ServiceSpecs';
import ServiceTypes from './components/ServiceTypes';

class PriceCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.onServiceChange = this.onServiceChange.bind(this);
    this.onServiceTypeChange = this.onServiceTypeChange.bind(this);
    this.onSpecChange = this.onSpecChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.getSelectedService = this.getSelectedService.bind(this);
    this.getSelectedServiceType = this.getSelectedServiceType.bind(this);
    this.getServiceTypes = this.getServiceTypes.bind(this);
    this.getSpecs = this.getSpecs.bind(this);
    this.getCartSpecs = this.getCartSpecs.bind(this);
  }
  componentDidMount() {
    this.props.getServices();
  }
  onServiceChange(idServiceCategory) {
    this.props.updateService(idServiceCategory);
  }
  onServiceTypeChange(idServiceType) {
    this.props.updateServiceType(idServiceType);
  }
  onSpecChange(key, idSpecs) {
    this.props.updateCartSpec({ idSpecs, key });
  }
  onAmountChange(amount, idSpecs) {
    this.props.updateCartSpec({ idSpecs, amount });
  }
  getSelectedService() {
    const { services, idServiceCategory } = this.props;
    return services ? services.filter(serv => serv.idServiceCategory === idServiceCategory)[0] : {};
  }
  getServiceTypes() {
    const selectedService = this.getSelectedService();
    return selectedService && selectedService.serviceTypes;
  }
  getSelectedServiceType() {
    const { idServiceType } = this.props;
    const serviceTypes = this.getServiceTypes();
    return serviceTypes ? serviceTypes.filter(serv => serv.idServiceType === idServiceType)[0] : {};
  }
  getSpecs() {
    const selectedServiceType = this.getSelectedServiceType();
    return selectedServiceType && selectedServiceType.specs;
  }
  getCartSpecs() {
    const { cart } = this.props;
    return cart && cart.selectedService && cart.selectedService.selectedServiceType && cart.selectedService.selectedServiceType.specs;
  }
  render() {
    const { services, idServiceCategory, idServiceType, cart, handleStartOrder } = this.props;
    const serviceTypes = this.getServiceTypes();
    const cartSpecs = this.getCartSpecs();
    const specs = this.getSpecs();
    return (
      <div className="row align-center">
        <div className="row column small-12 medium-6 My(28px)">
          {services ? (
            <Services services={services} idServiceCategory={idServiceCategory} onServiceChange={this.onServiceChange} />
          ) : null}
          {serviceTypes ? (
            <ServiceTypes serviceTypes={serviceTypes} idServiceType={idServiceType} onServiceTypeChange={this.onServiceTypeChange} />
          ) : null}
          {specs ? (
            <ServiceSpecs specs={specs} cartSpecs={cartSpecs} subtotal={cart.subtotal} onSpecChange={this.onSpecChange} onAmountChange={this.onAmountChange} />
          ) : null}
          <div className="column small-12 My(14px)">
            <div>tu costo total estimado</div>
            <div className="total">${ Math.round(cart.total * 100) / 100}</div>
          </div>
          <div className="row column small-12">
            <button type="button" className="button" onClick={handleStartOrder}>Inicia Tu Orden</button>
          </div>
        </div>
      </div>
    );
  }
}

PriceCalculator.propTypes = {
  cart: PropTypes.object.isRequired,
  services: PropTypes.array.isRequired,
  idServiceCategory: PropTypes.number.isRequired,
  idServiceType: PropTypes.number.isRequired,
  getServices: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  updateServiceType: PropTypes.func.isRequired,
  updateCartSpec: PropTypes.func.isRequired,
  handleStartOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  services: state.services.services,
  idServiceCategory: state.services.idServiceCategory,
  idServiceType: state.services.idServiceType,
});

export default connect((mapStateToProps), {
  getServices,
  updateService,
  updateServiceType,
  updateCartSpec,
})(PriceCalculator);
