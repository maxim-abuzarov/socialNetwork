import React from 'react';
import postsClasses from './posts.module.css';
import Post from "./post/Post";

const Posts = (props) => {
    let posts = [...props.posts]
        .reverse()
        .map(post => <Post
        key={post.id}
        author={post.author}
        date={post.date}
        title={post.title}
        text={post.text}
        url={post.url}
    />)

    let addPost = () => {
        props.addPost();
    }

    let onPostChange = (e) => {
        let newText = e.target.value;
        props.onPostChange(newText);
    }

    return (
        <div className={postsClasses.posts}>

            <div>
                <h1>Add post</h1>
            </div>

            <div className={postsClasses.addPost}>

                <textarea
                    onChange={onPostChange}
                    placeholder='Add your post'
                    value={props.newPostText}
                />
                <button onClick={addPost}>Add</button>

            </div>

            {posts}

        </div>
    );
};

export default Posts;
