import React from 'react';
import {NavLink} from "react-router-dom";
import friendClasses from './friend.module.css';

const Friend = (props) => {
    return (
        <NavLink to={'/id' + props.id} className={friendClasses.friend}>

            <div className={friendClasses.name}>

                {props.name}

            </div>

            <div className={friendClasses.photo}>

                <img src={props.url} alt='Friend avatar'/>

            </div>

        </NavLink>
    );
};

export default Friend;
