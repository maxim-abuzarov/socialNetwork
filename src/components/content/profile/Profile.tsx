import React, {ChangeEvent, FC, useState} from 'react'
import profileClasses from './profile.module.css'
import avatar from './../../../assets/img/unknownUser.jpeg'
import Loading from '../../common/loading/Loading'
import ProfileStatus from './status/ProfileStatus'
import ProfileInfoForm from './info/ProfileInfoForm'
import {ProfilePropsType} from '../Content'
import {ContactsType, ProfileType} from '../../../types/types'

type ProfileInfoType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Profile: FC<ProfilePropsType> = ({
                                           profile,
                                           savePhoto,
                                           saveProfileData,
                                           isOwner,
                                           status,
                                           updateStatus,
                                           isFollow,
                                           follow,
                                           unfollow,
                                           authorizedUserId
}) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <div className={profileClasses.profileLoading}>
            <Loading />
        </div>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfileData(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div className={profileClasses.profile}>

            <div className={profileClasses.photo}>
                <img src={profile.photos.large ? profile.photos.large : avatar} alt="Profile avatar"/>
                {profile.userId === authorizedUserId
                    ? null
                    : <div>
                        {isFollow
                            ? <button
                                onClick={() => {
                                    unfollow(profile.userId)
                                }}
                                className={profileClasses.unfollow}
                            >Followed</button>
                            : <button
                                onClick={() => {
                                    follow(profile.userId)
                                }}
                                className={profileClasses.follow}
                            >Follow</button>
                        }
                    </div>
                }

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
    )
}

const ProfileInfo: FC<ProfileInfoType> = ({profile, isOwner, goToEditMode}) => {
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
                <h1>Contacts:</h1>
                {Object
                    .keys(profile.contacts)
                    .map((key => {return <Contacts
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key as keyof ContactsType]} />}))
                }
            </div>

            {isOwner &&
            <div className={profileClasses.button}>
                <button onClick={goToEditMode}>Edit</button>
            </div>
            }

        </div>
    )
}

const Contacts: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
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

export default Profile
