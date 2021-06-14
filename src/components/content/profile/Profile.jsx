import React from 'react';
import profileClasses from './profile.module.css';

const Profile = () => {
    return (
        <div className={profileClasses.profile}>

            <div className={profileClasses.photo}>
                <img src="https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg" alt="Profile avatar"/>
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