import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from '../images/__logo.svg';

function Header (props) {

  return (
    <header className='header'>
      <img 
        className='header__logo' 
        src={logo} 
        alt='логотип mesto russia'
      />
        <Switch>
          <Route path='/sign-up'>
            <Link to='sign-in' className='header__link'>
              Войти
            </Link>
          </Route>
          <Route path='/sign-in'>
            <Link to='sign-up'className='header__link'>
              Регистрация
            </Link>
          </Route>
          <Route path='/'>
            <div className='header__info-container'>
              <p className='header__email'>{props.email}</p>
              <Link 
                to='sign-in' 
                className='header__link'
                onClick={props.onSignOut}
              >
                Выйти
              </Link>
            </div>
          </Route>
        </Switch>
    </header>
  );
}

export default Header;