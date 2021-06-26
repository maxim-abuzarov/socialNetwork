import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import friendClasses from './friend.module.css'
import avatar from './../../../assets/img/unknownUser.jpeg'

type PropsType = {
    id: number
    name: string
    url: string | null
}

const Friend: FC<PropsType> = ({id, name, url}) => {
    return (
        <NavLink to={'/profile/' + id} className={friendClasses.friend}>

            <div className={friendClasses.name}>

                {name.toLowerCase()}

            </div>

            <div className={friendClasses.photo}>

                <img src={url ? url : avatar} alt='Friend avatar'/>

            </div>

        </NavLink>
    )
}

export default Friend
