/* global $*/

import React, { PropTypes } from 'react';

class TokenSelector extends React.Component {
  componentDidMount() {
    $('.ui.dropdown').dropdown();
  }
  render() {
    const tokens = this.props.tokens.map((token, idx) => (
      <div key={ idx }>
        <span><i className="fa fa-credit-card"></i></span>
        <span>XXXX-XXXX-XXXX-</span>
        <span>{ token.last4 }</span>
      </div>
    ));
    return (
      <section>
        <div className="ui dropdown">
          <input type="hidden" name="gender" />
          <div className="default text">Payment Method</div>
          <div className="menu">
            { tokens }
          </div>
        </div>
      </section>
    );
  }
}

TokenSelector.propTypes = {
  tokens: PropTypes.array,
};

export default TokenSelector;
