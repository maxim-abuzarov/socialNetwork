import React from 'react';
import Profile from "./profile/Profile";
import PostsContainer from "./posts/PostsContainer";

const Content = (props) => {
    return (
        <aside>

            <Profile profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>

            <PostsContainer />

        </aside>
    );
};

export default Content;
