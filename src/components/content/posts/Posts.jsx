import React from 'react';
import postsClasses from './posts.module.css';
import Post from "./post/Post";

const Posts = (props) => {
    let posts = props.postsData.map(post => <Post
        key={post.id}
        author={post.author}
        date={post.date}
        title={post.title}
        text={post.text}
        url={post.url}
    />)

    return (
        <div className={postsClasses.posts}>

            <div>
                <h1>Add post</h1>
            </div>

            <div className={postsClasses.addPost}>

                <textarea placeholder='Add your post'></textarea>
                <button>Add</button>

            </div>

            {posts}

        </div>
    );
};

export default Posts;
