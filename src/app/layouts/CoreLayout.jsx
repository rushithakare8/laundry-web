import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Errors from '../components/Errors';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Menu from '../components/Menu';

const routeTitle = {
  '/main': 'Inicio',
  '/main/': 'Inicio',
  '/main/neworder': 'Nueva Orden',
  '/main/profile': 'Perfil de Usuario',
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
    const { children, location, user, config, errors } = this.props;
    const title = routeTitle[location.pathname];
    return (
      <div className="ui">
        <Header title={title} openMenu={this.openMenu} user={user} />
        <Loading config={config.loading} />
        <Errors errors={errors} />
        <Menu user={user} opened={this.state.openedMenu} openMenu={this.openMenu} />
        {children}
      </div>
    );
  }
}

CoreLayout.propTypes = {
  errors: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  config: state.config,
});

export default connect(mapStateToProps)(CoreLayout);
