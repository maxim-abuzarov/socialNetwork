import React from 'react';
import logo from './../../assets/img/logo.svg';
import headerClasses from './header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={headerClasses.header}>

            <div className={headerClasses.logotype}>
                <NavLink to='/profile'>
                    <img src={logo} alt="M logotype"/>
                </NavLink>
            </div>

        </header>
    );
};

export default Header;
