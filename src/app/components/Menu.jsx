import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const Menu = ({ user, opened, openMenu }) => {
  const sideClass = classnames(
    'sidebar', { active: opened }
  );
  return (
    <div className={sideClass}>
      <div className="sidebar-overlay" onClick={openMenu}></div>
      <div className="sidebar-content">
        <div className="top-head">
          <div className="name">{user.displayName}</div>
          <div className="email">{user.email}</div>
        </div>
        <nav className="nav-left" onClick={openMenu}>
          <Link to="/main"><i className="fa fa-home"></i><span>Overview</span></Link>
          <Link to="/main/neworder"><i className="fa fa-cart-plus"></i><span>New Order</span></Link>
          <a href="#close" onClick={openMenu}>
            <i className="fa fa-times"></i><span>Close</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

Menu.propTypes = {
  opened: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  openMenu: PropTypes.func.isRequired,
};

export default Menu;
