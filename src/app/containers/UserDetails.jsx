import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateUserInfo,
} from '../data/actions/user';

import UserDetailsForm from '../components/user/UserDetailsForm';

class UserDetails extends React.Component {
  static handleSubmitUserDetails(values, dispatch) {
    return updateUserInfo(values, dispatch);
  }
  render() {
    const { user } = this.props;
    const { idClient, name, lastName, email, rfc, razonSocial, loginID } = user;
    const userInitialValues = { idClient, name, lastName, email, rfc, razonSocial, loginID };
    return (
      <div className="ui column row">
        <UserDetailsForm initialValues={userInitialValues} onSubmit={UserDetails.handleSubmitUserDetails} />
      </div>
    );
  }
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect((mapStateToProps), {
})(UserDetails);
