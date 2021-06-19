import React from 'react';
import {NavLink} from "react-router-dom";
import navigationClasses from './navigation.module.css';
import profileIcon from './../../assets/img/profile.svg';
import messagesIcon from './../../assets/img/messages.svg';
import usersIcon from './../../assets/img/users.svg';
import Friend from "./friends/Friend";
import Loading from "../common/loading/Loading";

const Navigation = (props) => {
    let friends = props.friends.map(friend => <Friend
        key={friend.id}
        id={friend.id}
        name={friend.name}
        url={friend.photos.large}
    />)

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

            <div className={navigationClasses.friendsBlock}>

                <div>
                    <h1>Friends</h1>
                </div>

                <div className={navigationClasses.friends}>
                    {props.isLoading ? <Loading /> : friends}
                </div>

            </div>
        </nav>
    );
};

export default Navigation;
