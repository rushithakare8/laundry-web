import React, { PropTypes } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

const Menu = ({ user, opened, openMenu }) => (
  <div className={cx('sidebar', { active: opened })}>
    <div className="sidebar-overlay" onClick={openMenu} />
    <div className="sidebar-content">
      <div className="top-head">
        <div className="name">{user.displayName}</div>
        <div className="email">{user.email}</div>
      </div>
      <nav className="nav-left" onClick={openMenu}>
        <Link to="/main"><i className="fa fa-home" /><span>Inicio</span></Link>
        <Link to="/main/neworder"><i className="fa fa-cart-plus" /><span>Nueva Orden</span></Link>
        <Link to="/main/profile"><i className="fa fa-user" /><span>Perfil de Usuario</span></Link>
        <a href="#close" onClick={openMenu}>
          <i className="fa fa-times" /><span>Cerrar Menu</span>
        </a>
        <a href="/logout">
          <i className="fa fa-sign-out" /><span>Cerar Sesión</span>
        </a>
      </nav>
    </div>
  </div>
);

Menu.propTypes = {
  opened: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  openMenu: PropTypes.func.isRequired,
};

export default Menu;
