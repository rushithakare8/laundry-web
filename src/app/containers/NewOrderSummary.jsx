import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NewOrderSummary extends React.Component {
  componentDidMount() {}
  render() {
    const { services, price } = this.props.cart;
    const increment = this.props.cart.increment || 0;
    return (
      <div className="ui two column grid">
        <div className="row">
          <div className="column">
            <span className="Pend(7px)">{services.length}</span>
            <span>Servicios</span>
          </div>
          <div className="column"><span>{(price + increment)}</span></div>
        </div>
      </div>
    );
  }
}

NewOrderSummary.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect((mapStateToProps), {
})(NewOrderSummary);
