import React from 'react';
import friendClasses from './friend.module.css';

const Friend = () => {
    return (
        <div className={friendClasses.friend}>

            <h2>Maxim</h2>

            <img src='https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg' alt='Friend avatar'/>

        </div>
    );
};

export default Friend;