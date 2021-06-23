import React from 'react';
import postClasses from './post.module.css';

const Post = ({url, author, date, title, text}) => {
    return (
        <div className={postClasses.post}>
            <div className={postClasses.header}>

                <div className={postClasses.left}>
                    <img src={url} alt="Author avatar"/>
                </div>

                <div className={postClasses.author}>
                    <h4>{author}</h4>
                    <p>{date}</p>
                </div>

            </div>

            <div className={postClasses.content}>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Post;
