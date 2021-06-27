import React from 'react'
import {connect} from 'react-redux'
import Users from './Users'
import {
    FilterType,
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
    getUsersFilter,
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
    filter: FilterType
}
type DispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
type PropsType = MapPropsType & DispatchPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter)
    }

    onFilterChanged = (filter: FilterType) => {
        this.props.getUsers(1, this.props.pageSize, filter)
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
                onFilterChanged={this.onFilterChanged}
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
        followingProgress: getFollowingProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose(
    connect<MapPropsType, DispatchPropsType, {},  AppStateType>(
        mapStateToProps,
        {follow, unfollow, getUsers})
)(UsersContainer)
