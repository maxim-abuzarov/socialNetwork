import React from 'react';
import {NavLink} from "react-router-dom";
import navigationClasses from './navigation.module.css';
import profileIcon from './img/profile.svg';
import messagesIcon from './img/messages.svg';
import usersIcon from './img/users.svg';

const Navigation = () => {
    return (
        <nav className={navigationClasses.navigation}>
            <ul>

                <li>
                    <NavLink to="/profile" activeClassName={navigationClasses.active}>
                        <img src={profileIcon} alt="Profile icon"/>
                        <span>Profile</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/messages" activeClassName={navigationClasses.active}>
                        <img src={messagesIcon} alt="Messages icon"/>
                        <span>Messages</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/users" activeClassName={navigationClasses.active}>
                        <img src={usersIcon} alt="Users icon"/>
                        <span>Users</span>
                    </NavLink>
                </li>

            </ul>
        </nav>
    );
};

export default Navigation;
