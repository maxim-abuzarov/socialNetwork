import React from 'react';
import {NavLink} from "react-router-dom";
import friendClasses from './friend.module.css';
import avatar from './../../../assets/img/unknownUser.jpeg';

const Friend = (props) => {
    return (
        <NavLink to={'/profile/' + props.id} className={friendClasses.friend}>

            <div className={friendClasses.name}>

                {props.name.toLowerCase()}

            </div>

            <div className={friendClasses.photo}>

                <img src={props.url ? props.url : avatar} alt='Friend avatar'/>

            </div>

        </NavLink>
    );
};

export default Friend;
