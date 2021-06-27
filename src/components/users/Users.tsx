import React, {FC, useEffect} from 'react'
import usersClasses from './users.module.css'
import Loading from '../common/loading/Loading'
import Paginator from '../common/paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import {FilterType, follow, getUsers, unfollow} from '../../redux/reducers/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFollowingProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersInfo
} from '../../redux/selectors/usersSelectors'

const Users: FC = () => {
    const users = useSelector(getUsersInfo)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const isLoading = useSelector(getIsLoading)
    const filter = useSelector(getUsersFilter)
    const followingProgress = useSelector(getFollowingProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [currentPage, pageSize, filter, dispatch])

    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }

    const onPageChanged = (pageNumber: number) => {
       dispatch(getUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    return (
        <div className={usersClasses.inner}>
            {isLoading ? <Loading /> : null}

            <Paginator
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                isLoading={isLoading}
            />

            <UsersSearchForm onFilterChanged={onFilterChanged} />

            {users.map(user => {
                return <User
                    key={user.id}
                    user={user}
                    followingProgress={followingProgress}
                    follow={followUser}
                    unfollow={unfollowUser}
                    isLoading={isLoading}
                />})
            }
        </div>
    )
}

export default Users
