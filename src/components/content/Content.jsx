import React from 'react';
import Profile from "./profile/Profile";
import PostsContainer from "./posts/PostsContainer";

const Content = ({profile, saveProfileData, savePhoto, isOwner, status, updateStatus}) => {
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
    );
};

export default Content;
