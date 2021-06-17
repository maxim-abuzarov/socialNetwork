import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingProgress,
    toggleIsLoading,
    unfollow
} from "../../redux/reducers/usersReducer";
import React from "react";
import Users from "./Users";
import {usersAPI} from "../../api/api";

class UsersContainer extends React.Component{
    componentDidMount() {
        this.props.toggleIsLoading(true);

        if (this.props.users.length === 0) {
            usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
                .then(data => {
                    this.props.toggleIsLoading(false);
                    this.props.setUsers(data.items)
                    this.props.setTotalUsersCount(data.totalCount)
                });
        }
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsLoading(true);

        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsLoading(false);
                this.props.setUsers(data.items)
            });
    }

    render() {
        return <>
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                isLoading={this.props.isLoading}
                onPageChanged={this.onPageChanged}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingProgress={this.props.followingProgress}
            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        followingProgress: state.usersPage.followingProgress,
    }
}

export default connect(mapStateToProps,
    {setUsers, setTotalUsersCount, setCurrentPage, follow, unfollow, toggleIsLoading, toggleFollowingProgress}
) (UsersContainer);
