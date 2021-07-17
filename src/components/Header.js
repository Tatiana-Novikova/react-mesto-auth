import React from 'react';
import logo from '../images/__logo.svg';

function Header () {
  return (
    <header className="header">
      <img 
        className="header__logo" 
        src={logo} 
        alt="логотип mesto russia" 
      /> 
    </header>
  );
}

export default Header;