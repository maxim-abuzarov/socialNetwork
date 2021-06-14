import React from 'react';
import postsClasses from './posts.module.css';

const Posts = () => {
    return (
        <div className={postsClasses.posts}>

            <div>
                <h1>Add post</h1>
            </div>

            <div className={postsClasses.addPost}>

                <textarea placeholder='Add your post'></textarea>
                <button>Add</button>

            </div>

        </div>
    );
};

export default Posts;