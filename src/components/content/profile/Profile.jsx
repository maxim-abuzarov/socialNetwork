import React from 'react';
import profileClasses from './profile.module.css';
import avatar from './../../../assets/img/unknownUser.jpeg';
import Loading from "../../common/loading/Loading";
import ProfileStatus from "./status/ProfileStatus";

const Profile = (props) => {
    if (!props.profile) {
        return <div className={profileClasses.profileLoading}>
            <Loading />
        </div>
    }

    return (
        <div className={profileClasses.profile}>

            <div className={profileClasses.photo}>
                <img src={props.profile.photos.large ? props.profile.photos.large : avatar} alt="Profile avatar"/>
            </div>

            <div className={profileClasses.info}>
                <h2>{props.profile.fullName ? props.profile.fullName : 'Name'}</h2>

                <div className={profileClasses.status}>
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
                </div>

            </div>

        </div>
    );
};

export default Profile;
