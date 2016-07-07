import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class NewOrderView extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="row small-12">
        <span className=""></span>
      </div>
    );
  }
}

NewOrderView.propTypes = {
  cart: PropTypes.object,
  services: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  services: state.services,
});

export default connect((mapStateToProps), {
})(NewOrderView);
