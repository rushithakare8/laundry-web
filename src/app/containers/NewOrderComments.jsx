/* global $ */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateCartInfo } from '../redux/reducers/cart';

class NewOrderComments extends React.Component {
  constructor(props) {
    super(props);
    this.changeInfoHandler = this.changeInfoHandler.bind(this);
  }
  changeInfoHandler(event) {
    const values = {};
    values[event.target.name] = event.target.value;
    this.props.updateCartInfo(values);
  }
  render() {
    return (
      <div className="ui column row">
        <h3>Comments</h3>
        <div className="ui form">
          <div className="field">
            <label htmlFor="comments"></label>
            <textarea placeholder="Comments" name="comments" onChange={this.changeInfoHandler}></textarea>
          </div>
        </div>
      </div>
    );
  }
}

NewOrderComments.propTypes = {
  updateCartInfo: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect((mapStateToProps), {
  updateCartInfo,
})(NewOrderComments);
