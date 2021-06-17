import React from 'react';
import usersClasses from "./users.module.css";
import {NavLink} from "react-router-dom";
import avatar from "../../assets/img/unknownUser.jpeg";
import Loading from "../loading/Loading";
import * as axios from "axios";

const Users = (props) => {
    // count quantity of pages
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={usersClasses.inner}>

            {props.isLoading ? <Loading /> : null}

            <div className={props.isLoading ? usersClasses.pagesLoading : usersClasses.pages}>

                {pages.map(page => {
                    return <div
                        key={page}
                        className={props.currentPage === page
                            ? usersClasses.pageSelected
                            : usersClasses.page }
                        onClick={ () => {props.onPageChanged(page)} }
                    >{page}</div>
                })}

            </div>

            {props.users
                .map(user =>
                    <div key={user.id} className={props.isLoading ? usersClasses.usersLoading : usersClasses.user}>

                        <div className={usersClasses.name}>
                            <h1>{user.name.toLowerCase()}</h1>
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
                                ? <button disabled={props.followingProgress.some(id => id === user.id)} onClick={() => {
                                    props.toggleFollowingProgress(true, user.id)
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'a60e2925-9e48-4e88-a8f4-0ca5f14206c3'
                                        },
                                    })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(user.id)
                                            }
                                            props.toggleFollowingProgress(false, user.id)
                                        });


                                }} className={usersClasses.followed}>Followed</button>

                                : <button disabled={props.followingProgress.some(id => id === user.id)} onClick={() => {
                                    props.toggleFollowingProgress(true, user.id)
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'a60e2925-9e48-4e88-a8f4-0ca5f14206c3'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(user.id)
                                            }
                                            props.toggleFollowingProgress(false, user.id)
                                        });


                                }}>Follow</button>
                            }
                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default Users;
