import React from 'react';
import postClasses from './post.module.css';

const Post = (props) => {
    return (
        <div className={postClasses.post}>
            <div className={postClasses.header}>

                <div className={postClasses.left}>
                    <img src={props.url} alt="Author avatar"/>
                </div>

                <div className={postClasses.author}>
                    <h4>{props.author}</h4>
                    <p>{props.date}</p>
                </div>

            </div>

            <div className={postClasses.content}>
                <h2>{props.title}</h2>
                <p>{props.text}</p>
            </div>
        </div>
    );
};

export default Post;
