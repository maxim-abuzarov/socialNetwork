import React from 'react';
import logo from './../../assets/img/logo.svg';
import headerClasses from './header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={headerClasses.header}>

            <div className={headerClasses.logotype}>
                <NavLink to='/profile'>
                    <img src={logo} alt="M logotype"/>
                </NavLink>
            </div>

            <div className={headerClasses.login}>
                {props.isAuth
                    ? <h1>{props.login} - <button className={headerClasses.logout} onClick={props.logout}>Logout</button></h1>
                    : <NavLink to='/login'>Login</NavLink>
                }
            </div>

        </header>
    );
};

export default Header;
