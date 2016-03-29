/* global $ */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getServiceTypes as getServiceTypesFunc } from '../redux/reducers/orders';
import ServiceCategory from '../components/orders/service/ServiceCategory';

class ServiceSelector extends React.Component {
  componentDidMount() {
    $('.accordionServices').accordion();
  }
  render() {
    const serviceCategories = this.props.serviceTypes
      .filter(service => service.idServiceCategory)
      .map((service, idx) => (
        <ServiceCategory key={ idx } serviceCategory={ service } />
      ));
    return (
      <div className="ui accordion accordionServices">
        <h3>Services</h3>
        { serviceCategories }
      </div>
    );
  }
}

ServiceSelector.propTypes = {
  serviceTypes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  serviceTypes: state.serviceTypes,
});

export default connect((mapStateToProps), {
  getServiceTypes: getServiceTypesFunc,
})(ServiceSelector);
