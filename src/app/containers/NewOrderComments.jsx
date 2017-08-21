import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCartInfo } from '../data/actions/cart';

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
            <label htmlFor="comments" />
            <textarea placeholder="Comments" name="comments" onChange={this.changeInfoHandler} />
          </div>
        </div>
      </div>
    );
  }
}

NewOrderComments.propTypes = {
  updateCartInfo: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

export default connect((mapStateToProps), {
  updateCartInfo,
})(NewOrderComments);
