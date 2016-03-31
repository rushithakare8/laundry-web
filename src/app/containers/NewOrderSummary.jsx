/* global $ */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getServiceTypes as getServiceTypesFunc } from '../redux/reducers/orders';

class NewOrderSummary extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="ui three column grid">
        <div className="row">
          <div className="column">4 Services</div>
          <div className="column">$1,500.00</div>
          <div className="column">
            <button className="ui icon button">
              <i className="fa fa-check"></i>
              <span className="Mstart(10px)">Done</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

NewOrderSummary.propTypes = {
  serviceTypes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  serviceTypes: state.serviceTypes,
});

export default connect((mapStateToProps), {
  getServiceTypes: getServiceTypesFunc,
})(NewOrderSummary);
