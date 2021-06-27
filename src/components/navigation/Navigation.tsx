import React, {FC, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import navigationClasses from './navigation.module.css'
import profileIcon from './../../assets/img/profile.svg'
import messagesIcon from './../../assets/img/messages.svg'
import usersIcon from './../../assets/img/users.svg'
import Friend from './friends/Friend'
import Loading from '../common/loading/Loading'
import {useDispatch, useSelector} from 'react-redux'
import {getFriends, getIsLoading} from '../../redux/selectors/navigationSelectors'
import {getFriendsList} from '../../redux/reducers/asideReducer'

const Navigation: FC = () => {
    const friends = useSelector(getFriends)
    const isLoading = useSelector(getIsLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        const getFriend = () => {
            dispatch(getFriendsList())
        }
        dispatch(getFriend)
    }, [dispatch])

    let friendsList = friends.map(friend => <Friend
        key={friend.id}
        id={friend.id}
        name={friend.name}
        url={friend.photos.large}
    />)

    return (
        <nav className={navigationClasses.navigation}>
            <ul>

                <li>
                    <NavLink to="/profile" activeClassName={navigationClasses.active}>
                        <img src={profileIcon} alt="Profile icon"/>
                        <span>Profile</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/messages" activeClassName={navigationClasses.active}>
                        <img src={messagesIcon} alt="Messages icon"/>
                        <span>Messages</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/users" activeClassName={navigationClasses.active}>
                        <img src={usersIcon} alt="Users icon"/>
                        <span>Users</span>
                    </NavLink>
                </li>

            </ul>

            <div className={navigationClasses.friendsBlock}>

                <div>
                    <h1>Friends</h1>
                </div>

                <div className={navigationClasses.friends}>
                    {isLoading
                        ? <Loading />
                        : friendsList.length !== 0
                            ? friendsList
                            : 'Follow somebody'
                    }
                </div>

            </div>
        </nav>
    )
}

export default Navigation
