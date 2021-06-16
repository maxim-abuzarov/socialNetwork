import React from 'react';
import usersClasses from './users.module.css';
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import avatar from './../../assets/img/unknownUser.jpeg';

const Users = (props) => {
    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
            props.setUsers(response.data.items)
        });
    }

    return (
        <div className={usersClasses.inner}>

            {props.users
                .map(user =>
                    <div key={user.id} className={usersClasses.user}>

                        <div className={usersClasses.name}>
                            <h1>{user.name}</h1>
                        </div>

                        <div className={usersClasses.photo}>
                            <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.large !== null ? user.photos.large : avatar} alt='User avatar'/>
                            </NavLink>
                        </div>

                        <div className={usersClasses.status}>
                            <h3>{user.status !== null ? user.status : 'There could be a status here, but...'}</h3>
                        </div>

                        <div className={usersClasses.button}>
                            {user.followed
                                ? <button onClick={() => {props.unfollow(user.id)} } className={usersClasses.followed}>Followed</button>

                                : <button onClick={() => {props.follow(user.id)} }>Follow</button>
                            }
                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default Users;
