import React from 'react';
import { connect } from 'react-redux';
import UserDetails from '../containers/UserDetails';

class ProfileView extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <UserDetails />
    );
  }
}

ProfileView.propTypes = {};

const mapStateToProps = () => ({});

export default connect((mapStateToProps), {
})(ProfileView);
