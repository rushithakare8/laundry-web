import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Menu from '../../components/Menu';

const routeToTitle = {
  '/main': 'Overview',
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
    const title = routeToTitle[this.props.route.path];
    return (
      <div className="W(100%)">
        <Header title={ title } openMenu={ this.openMenu } user={ this.props.user } />
        <Menu opened={ this.state.openedMenu } openMenu={ this.openMenu }
          user={ this.props.user }
        />
        {children}
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default CoreLayout;

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(CoreLayout);