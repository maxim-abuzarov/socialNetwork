import React, {FC} from 'react'
import usersClasses from './users.module.css'
import Loading from '../common/loading/Loading'
import Paginator from '../common/paginator/Paginator'
import {UserType} from '../../types/types'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import {FilterType} from '../../redux/reducers/usersReducer'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: UserType[]
    followingProgress: number[]
    isLoading: boolean
    onFilterChanged: (filter: FilterType) => void
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: FC<PropsType> = ({
                                  totalUsersCount,
                                  pageSize,
                                  currentPage,
                                  users,
                                  followingProgress,
                                  isLoading,
                                  onPageChanged,
                                  follow,
                                  unfollow,
                                  onFilterChanged
}) => {
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
                    follow={follow}
                    unfollow={unfollow}
                    isLoading={isLoading}
                />})
            }
        </div>
    )
}

export default Users
