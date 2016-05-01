import React, { PropTypes } from 'react';

const Header = ({ openMenu, title }) => (
  <header className="header row align-justify P(15px)">
    <div className="column">
      <a className="C(#000) D(b) Ta(c)" onClick={openMenu}>
        <i className="fa fa-bars float-left"></i>
        <span>{title}</span>
      </a>
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  openMenu: PropTypes.func.isRequired,
};

export default Header;
