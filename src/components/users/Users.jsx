import React from 'react';
import usersClasses from "./users.module.css";
import {NavLink} from "react-router-dom";
import avatar from "../../assets/img/unknownUser.jpeg";
import * as axios from "axios";

class Users extends React.Component{
    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(response.data.totalCount)
                });
        }
    }
    
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }

    render() {

        // count quantity of pages

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = [];
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div className={usersClasses.inner}>

                <div className={usersClasses.pages}>

                    {pages.map(page => {
                        return <div
                            key={page}
                            className={this.props.currentPage === page
                                ? usersClasses.pageSelected
                                : usersClasses.page }
                            onClick={ () => {this.onPageChanged(page)} }
                        >{page}</div>
                    })}

                </div>

                {this.props.users
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
                                    ? <button onClick={() => {this.props.unfollow(user.id)} } className={usersClasses.followed}>Followed</button>

                                    : <button onClick={() => {this.props.follow(user.id)} }>Follow</button>
                                }
                            </div>

                        </div>
                    )
                }

            </div>
        );
    }
}

export default Users;
