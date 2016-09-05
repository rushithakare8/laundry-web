import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  updateUserInfo,
} from '../data/actions/user';

import UserDetailsForm from '../components/user/UserDetailsForm';

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitUserDetails = this.handleSubmitUserDetails.bind(this);
  }
  componentDidMount() {}
  handleSubmitUserDetails(values, dispatch) {
    return updateUserInfo(values, dispatch);
  }
  render() {
    const { user } = this.props;
    const { idClient, name, lastName, email, rfc, razonSocial } = user;
    const userInitialValues = { idClient, name, lastName, email, rfc, razonSocial };
    return (
      <div className="ui column row">
        <UserDetailsForm initialValues={userInitialValues} onSubmit={this.handleSubmitUserDetails} />
      </div>
    );
  }
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect((mapStateToProps), {
})(UserDetails);
