/* global $ */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getServiceTypes as getServiceTypesFunc } from '../redux/reducers/orders';

class NewOrderPayments extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="ui">
        <h3>Checkout</h3>
        <div>
          <button className="ui icon button">
            <i className="fa fa-credit-card"></i>
            <span className="Mstart(10px)">Add New Payment Method</span>
          </button>
        </div>
      </div>
    );
  }
}

NewOrderPayments.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect((mapStateToProps), {
  getServiceTypes: getServiceTypesFunc,
})(NewOrderPayments);
