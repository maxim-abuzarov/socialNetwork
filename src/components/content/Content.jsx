import React from 'react';
import contentClasses from './content.module.css';
import Profile from "./profile/Profile";
import Posts from "./posts/Posts";

const Content = () => {
    return (
        <aside className={contentClasses.content}>

            <Profile />

            <Posts />

        </aside>
    );
};

export default Content;
