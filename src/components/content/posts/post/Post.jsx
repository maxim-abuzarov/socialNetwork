import React from 'react';
import postClasses from './post.module.css';

const Post = () => {
    return (
        <div className={postClasses.post}>
            <div className={postClasses.header}>

                <div className={postClasses.left}>
                    <img src="https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg" alt="Author avatar"/>
                </div>

                <div className={postClasses.author}>
                    <h4>Maxim Abuzarov</h4>
                    <p>23 Aug 2021</p>
                </div>

            </div>

            <div className={postClasses.content}>
                <h2>Post title</h2>
                <p>Post text</p>
            </div>
        </div>
    );
};

export default Post;
