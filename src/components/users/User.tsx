import React, {FC} from 'react'
import usersClasses from './users.module.css'
import {NavLink} from 'react-router-dom'
import avatar from '../../assets/img/unknownUser.jpeg'
import {UserType} from '../../types/types'

type PropsType = {
    user: UserType
    followingProgress: number[]
    isLoading: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: FC<PropsType> = ({user, followingProgress, follow, unfollow, isLoading}) => {
    return (
        <div className={isLoading ? usersClasses.usersLoading : usersClasses.user}>

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
                    ? <button
                        disabled={followingProgress.some(id => id === user.id)}
                        onClick={() => {
                            unfollow(user.id)
                        }}
                        className={usersClasses.followed}
                    >Followed</button>

                    : <button
                        disabled={followingProgress.some(id => id === user.id)}
                        onClick={() => {
                            follow(user.id)
                        }}
                    >Follow</button>
                }
            </div>
        </div>
    )
}

export default User
