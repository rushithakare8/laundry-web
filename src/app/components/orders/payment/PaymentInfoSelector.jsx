/* global $ */

import React, { PropTypes } from 'react';
import cx from 'classnames';
const brandToFA = {
  Visa: 'visa',
  MasterCard: 'mastercard',
  'American Express': 'amex',
  Discover: 'discover',
  'Diners Club': 'diners-club',
  JCB: 'jcb',
};
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
      <div key={token.id} className="item" data-value={token.id} >
        <span className="Pend(7px)"><i className={cx('fa', `fa-cc-${brandToFA[token.brand]}`)}></i></span>
        <span>XXXX-XXXX-XXXX-</span>
        <span>{token.last4}</span>
      </div>
    ));
    return (
      <div id="dropdownPaymentInfo" className="ui fluid selection dropdown">
        <input type="hidden" name="idClientPaymentInfo" />
        <div className="default text">Payment Method</div>
        <i className="dropdown icon"></i>
        <div className="menu">
          {paymentInfos}
        </div>
      </div>
    );
  }
}

PaymentInfoSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  paymentInfos: PropTypes.array.isRequired,
};

export default PaymentInfoSelector;
