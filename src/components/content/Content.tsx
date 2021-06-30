import React, {FC} from 'react'
import Profile from './profile/Profile'
import PostsContainer from './posts/PostsContainer'
import {ProfileType} from '../../types/types'

export type ProfilePropsType = {
    profile: ProfileType | null
    saveProfileData: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    isFollow: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    authorizedUserId: number | null
}

const Content: FC<ProfilePropsType> = ({
                                           profile,
                                           saveProfileData,
                                           savePhoto,
                                           isOwner,
                                           status,
                                           updateStatus,
                                           isFollow,
                                           follow,
                                           unfollow,
                                           authorizedUserId
}) => {
    return (
        <aside>

            <Profile profile={profile}
                     saveProfileData={saveProfileData}
                     savePhoto={savePhoto}
                     isOwner={isOwner}
                     status={status}
                     updateStatus={updateStatus}
                     isFollow={isFollow}
                     follow={follow}
                     unfollow={unfollow}
                     authorizedUserId={authorizedUserId}
            />

            <PostsContainer />

        </aside>
    )
}

export default Content
