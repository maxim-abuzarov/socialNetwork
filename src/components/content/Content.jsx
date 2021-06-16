import React from 'react';
import Profile from "./profile/Profile";
import PostsContainer from "./posts/PostsContainer";

const Content = () => {
    return (
        <aside>

            <Profile />

            <PostsContainer />

        </aside>
    );
};

export default Content;
