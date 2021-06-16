import React from 'react';
import profileClasses from './profile.module.css';
import avatar from './../../../assets/img/unknownUser.jpeg';

const Profile = () => {
    return (
        <div className={profileClasses.profile}>

            <div className={profileClasses.photo}>
                <img src={avatar} alt="Profile avatar"/>
            </div>

            <div className={profileClasses.info}>
                <h2>Maxim Abuzarov</h2>

                <div className={profileClasses.status}>
                    Status
                </div>

            </div>

        </div>
    );
};

export default Profile;
