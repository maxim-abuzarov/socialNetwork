import React from 'react'
import {connect} from 'react-redux'
import Users from './Users'
import {
    follow,
    getUsers,
    unfollow,
} from '../../redux/reducers/usersReducer'
import {
    getCurrentPage,
    getFollowingProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsersInfo
} from '../../redux/selectors/usersSelectors'
import {UserType} from '../../types/types'
import {AppStateType} from '../../redux/store'
import {compose} from 'redux'

type MapPropsType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isLoading: boolean
    followingProgress: number[]
}
type DispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
type PropsType = MapPropsType & DispatchPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
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

const mapStateToProps = (state: AppStateType): MapPropsType => {
    return {
        users: getUsersInfo(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        followingProgress: getFollowingProgress(state)
    }
}

export default compose(
    connect<MapPropsType, DispatchPropsType, {},  AppStateType>(
        mapStateToProps,
        {follow, unfollow, getUsers})
)(UsersContainer)
