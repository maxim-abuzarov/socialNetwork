import React, {FC} from 'react'
import friendClasses from './friend.module.css'
import {NavLink} from 'react-router-dom'
import avatar from './../../../assets/img/unknownUser.jpeg'

type PropsType = {
    id: number
    url: string | null
    name: string
}

const Friend: FC<PropsType> = ({id, url, name}) => {
    return (
        <NavLink to={'/messages/id' + id} className={friendClasses.friends}>
            <div className={friendClasses.friend}>

                <img src={url ? url : avatar} alt='Friend avatar'/>

                <h2>{name}</h2>

            </div>
        </NavLink>
    )
}

export default Friend
