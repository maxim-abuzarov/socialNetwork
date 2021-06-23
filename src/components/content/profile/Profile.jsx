import React, {useState} from 'react';
import profileClasses from './profile.module.css';
import avatar from './../../../assets/img/unknownUser.jpeg';
import Loading from "../../common/loading/Loading";
import ProfileStatus from "./status/ProfileStatus";
import ProfileInfoForm from "./info/ProfileInfoForm";

const Profile = ({profile, savePhoto, saveProfileData, isOwner, status, updateStatus}) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <div className={profileClasses.profileLoading}>
            <Loading />
        </div>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfileData(formData).then(() => {
            setEditMode(false)
        });
    }

    return (
        <div className={profileClasses.profile}>

            <div className={profileClasses.photo}>
                <img src={profile.photos.large ? profile.photos.large : avatar} alt="Profile avatar"/>
                {isOwner
                && <div className={profileClasses.upload}>
                        <button>Add photo</button>
                        <input type="file" onChange={onMainPhotoSelected}/>
                   </div>
                }
            </div>

            <div className={profileClasses.info}>
                <h2>{profile.fullName ? profile.fullName : 'Name'}</h2>

                <div className={profileClasses.status}>
                    <ProfileStatus status={status} isOwner={isOwner} updateStatus={updateStatus} />
                </div>

                {editMode
                    ? <ProfileInfoForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileInfo profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}} />
                }

            </div>

        </div>
    );
};

const ProfileInfo = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={profileClasses.data}>
            <div className={profileClasses.dataItem}>
                <h1>Looking for a job: </h1>
                <p>{profile.lookingForAJob ? 'Yes' : 'No'}</p>
            </div>

            <div className={profileClasses.dataItem}>
                <h1>Professional skills:</h1>
                <p>{profile.lookingForAJobDescription}</p>
            </div>

            <div className={profileClasses.dataItem}>
                <h1>About me: </h1>
                <p>{profile.aboutMe}</p>
            </div>

            <div className={profileClasses.dataItemContacts}>
                <h1>Contacts:</h1> {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
            </div>

            {isOwner &&
            <div className={profileClasses.button}>
                <button onClick={goToEditMode}>Edit</button>
            </div>
            }

        </div>
    )
}

const Contacts = ({contactTitle, contactValue}) => {
    return (
        <div>
            {contactValue && <div className={profileClasses.contacts}>
                <h2>{contactTitle
                    ? contactValue && contactTitle
                    : null}
                </h2>
                <a href={contactValue} target='_blank' rel="noreferrer">{contactValue}</a>
            </div>
            }
        </div>
    )
}

export default Profile;
