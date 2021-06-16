import React from 'react';
import friendClasses from './friend.module.css';
import {NavLink} from "react-router-dom";

const Friend = (props) => {
    return (
        <NavLink to={'/messages/id' + props.id} className={friendClasses.friends}>
            <div className={friendClasses.friend}>

                <img src={props.url} alt='Friend avatar'/>

                <h2>{props.name}</h2>

            </div>
        </NavLink>
    );
};

export default Friend;