import {connect} from "react-redux";
import {
    follow,
    unfollow,
    followSuccess,
    getUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollowSuccess
} from "../../redux/reducers/usersReducer";
import React from "react";
import Users from "./Users";

class UsersContainer extends React.Component{
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            <Users
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                isLoading={this.props.isLoading}
                followingProgress={this.props.followingProgress}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
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
    {
        setCurrentPage,
        followSuccess,
        unfollowSuccess,
        toggleFollowingProgress,
        getUsers,
        follow, 
        unfollow}
) (UsersContainer);
