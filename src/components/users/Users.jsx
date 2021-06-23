import React, {useState} from 'react';
import usersClasses from "./users.module.css";
import {NavLink} from "react-router-dom";
import avatar from "../../assets/img/unknownUser.jpeg";
import Loading from "../common/loading/Loading";

const Users = ({
                   totalUsersCount,
                   pageSize,
                   isLoading,
                   currentPage,
                   onPageChanged,
                   users,
                   followingProgress,
                   follow,
                   unfollow }) => {
    // count quantity of pages
    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    // pagination
    const portionSize = 15;
    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={usersClasses.inner}>

            {isLoading ? <Loading /> : null}

            <div className={isLoading ? usersClasses.pagesLoading : usersClasses.pages}>

                {portionNumber > 1 &&
                <button className={usersClasses.page} onClick={() => {setPortionNumber(portionNumber - 1) }}>&lt;
                </button>
                }

                {pages
                    .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page => {
                    return <div
                        key={page}
                        className={currentPage === page
                            ? usersClasses.pageSelected
                            : usersClasses.page }
                        onClick={ () => {onPageChanged(page)} }
                    >{page}</div>
                })}

                {portionCount > portionNumber &&
                <button className={usersClasses.page} onClick={() => { setPortionNumber(portionNumber + 1) }}>&gt;
                </button>
                }

            </div>

            {users
                .map(user =>
                    <div key={user.id} className={isLoading ? usersClasses.usersLoading : usersClasses.user}>

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
                                ? <button disabled={followingProgress.some(id => id === user.id)} onClick={() => {
                                    unfollow(user.id);
                                }} className={usersClasses.followed}>Followed</button>

                                : <button disabled={followingProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id)
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
