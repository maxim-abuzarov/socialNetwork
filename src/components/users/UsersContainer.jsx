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
import {
    getCurrentPage,
    getFollowingProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsersInfo
} from "../../redux/selectors/usersSelectors";

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
        users: getUsersInfo(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingProgress: getFollowingProgress(state),
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
