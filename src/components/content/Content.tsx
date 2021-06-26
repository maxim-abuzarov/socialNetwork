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
}

const Content: FC<ProfilePropsType> = ({
                                           profile,
                                           saveProfileData,
                                           savePhoto,
                                           isOwner,
                                           status,
                                           updateStatus
}) => {
    return (
        <aside>

            <Profile profile={profile}
                     saveProfileData={saveProfileData}
                     savePhoto={savePhoto}
                     isOwner={isOwner}
                     status={status}
                     updateStatus={updateStatus} />

            <PostsContainer />

        </aside>
    )
}

export default Content
