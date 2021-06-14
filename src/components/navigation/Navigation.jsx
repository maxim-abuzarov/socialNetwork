import React from 'react';
import navigationClasses from './navigation.module.css';
import profileIcon from './img/profile.svg';
import messagesIcon from './img/messages.svg';
import usersIcon from './img/users.svg';

const Navigation = () => {
    return (
        <nav className={navigationClasses.navigation}>
            <ul>

                <li>
                    <a href="#">
                        <img src={profileIcon} alt="Profile icon"/>
                        <span>Profile</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={messagesIcon} alt="Messages icon"/>
                        <span>Messages</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={usersIcon} alt="Users icon"/>
                        <span>Users</span>
                    </a>
                </li>

            </ul>
        </nav>
    );
};

export default Navigation;
