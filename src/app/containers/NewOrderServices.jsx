/* global $ */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getServiceTypes as getServiceTypesFunc } from '../redux/reducers/orders';
import ServiceOption from '../components/orders/ServiceOption';

class ServiceSelector extends React.Component {
  componentDidMount() {
    $('.ui.accordion').accordion();
  }
  render() {
    const services = this.props.serviceTypes.map((service, idx) => (
      <ServiceOption key={ idx } service={ service } />
    ));
    return (
      <div className="ui accordion">
        <h3>Services</h3>
        { services }
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
