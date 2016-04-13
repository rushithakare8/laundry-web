/* global $ */

import React, { PropTypes } from 'react';

class PaymentInfoSelector extends React.Component {
  componentDidMount() {
    $('#dropdownPaymentInfo').dropdown({
      onChange: (value) => {
        this.props.onChange({
          target: {
            name: 'idClientPaymentInfo',
            value,
          },
        });
      },
    });
  }
  render() {
    const paymentInfos = this.props.paymentInfos.map((token) => (
      <div key={ token.idClientPaymentInfo }>
        <span><i className="fa fa-credit-card"></i></span>
        <span>XXXX-XXXX-XXXX-</span>
        <span>{ token.last4 }</span>
      </div>
    ));
    return (
      <section>
        <div id="dropdownPaymentInfo" className="ui fluid selection dropdown">
          <input type="hidden" name="idClientPaymentInfo" />
          <div className="default text">Payment Method</div>
          <div className="menu">
            { paymentInfos }
          </div>
        </div>
      </section>
    );
  }
}

PaymentInfoSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  paymentInfos: PropTypes.array.isRequired,
};

export default PaymentInfoSelector;
