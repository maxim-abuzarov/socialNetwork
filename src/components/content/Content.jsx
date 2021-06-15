import React from 'react';
import Profile from "./profile/Profile";
import Posts from "./posts/Posts";

const Content = (props) => {
    return (
        <aside>

            <Profile />

            <Posts postsData={props.postsData}
                   newPostText={props.newPostText}
                   dispatch={props.dispatch}
            />

        </aside>
    );
};

export default Content;
