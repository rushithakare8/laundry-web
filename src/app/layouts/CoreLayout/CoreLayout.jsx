import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Menu from '../../components/Menu';

const routeTitle = {
  '/main': 'Overview',
  '/main/neworder': 'New Order',
};

class CoreLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openedMenu: false };
    this.openMenu = this.openMenu.bind(this);
  }
  openMenu() {
    this.setState({
      openedMenu: !this.state.openedMenu,
    });
  }
  render() {
    const { children } = this.props;
    const title = routeTitle[this.props.location.pathname];
    return (
      <div className="ui">
        <Header title={ title } openMenu={ this.openMenu } user={ this.props.user } />
        <Menu opened={ this.state.openedMenu } openMenu={ this.openMenu }
          user={ this.props.user }
        />
        { children }
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default CoreLayout;

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(CoreLayout);
