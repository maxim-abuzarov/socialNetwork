import React from 'react';
import logo from './../../assets/img/logo.svg';
import headerClasses from './header.module.css';
import {NavLink} from "react-router-dom";

const Header = ({isAuth, login, logout}) => {
    return (
        <header className={headerClasses.header}>

            <div className={headerClasses.logotype}>
                <NavLink to='/profile'>
                    <img src={logo} alt="M logotype"/>
                </NavLink>
            </div>

            <div className={headerClasses.login}>
                {isAuth
                    ? <h1>{login} - <button className={headerClasses.logout} onClick={logout}>Logout</button></h1>
                    : <NavLink to='/login'>Login</NavLink>
                }
            </div>

        </header>
    );
};

export default Header;
