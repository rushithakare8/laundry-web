import React from 'react';
import { connect } from 'react-redux';
import UserDetails from '../containers/UserDetails';
import UserAddress from '../containers/UserAddress';
import UserPayments from '../containers/UserPayments';

class ProfileView extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="ui container">
        <UserDetails />
        <hr className="My(14px)" />
        <UserAddress />
        <hr className="My(14px)" />
        <UserPayments />
      </div>
    );
  }
}

ProfileView.propTypes = {};

const mapStateToProps = () => ({});

export default connect((mapStateToProps), {
})(ProfileView);
