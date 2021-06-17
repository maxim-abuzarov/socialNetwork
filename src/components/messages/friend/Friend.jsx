import React from 'react';
import friendClasses from './friend.module.css';
import {NavLink} from "react-router-dom";
import avatar from './../../../assets/img/unknownUser.jpeg';

const Friend = (props) => {
    return (
        <NavLink to={'/messages/id' + props.id} className={friendClasses.friends}>
            <div className={friendClasses.friend}>

                <img src={props.url ? props.url : avatar} alt='Friend avatar'/>

                <h2>{props.name}</h2>

            </div>
        </NavLink>
    );
};

export default Friend;