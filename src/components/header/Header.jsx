import React from 'react';
import logo from './logo.svg';
import headerClasses from './header.module.css';

const Header = () => {
    return (
        <header className={headerClasses.header}>

            <div className={headerClasses.logotype}>
                <img src={logo} alt="M logotype"/>
            </div>

        </header>
    );
};

export default Header;
