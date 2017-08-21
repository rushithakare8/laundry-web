import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ openMenu, title }) => (
  <header className="header row align-justify P(15px)">
    <div className="column">
      <button className="C(#000) D(b) Ta(c)" onClick={openMenu}>
        <i className="fa fa-bars float-left" />
        <span>{title}</span>
      </button>
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  openMenu: PropTypes.func.isRequired,
};

export default Header;
