import React from 'react';
import Profile from "./profile/Profile";
import PostsContainer from "./posts/PostsContainer";

const Content = (props) => {
    return (
        <aside>

            <Profile profile={props.profile}/>

            <PostsContainer />

        </aside>
    );
};

export default Content;
