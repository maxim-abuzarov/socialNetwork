import React from 'react';
import postsClasses from './posts.module.css';
import Post from "./post/Post";
import {addPostAC, updateNewPostTextAC} from "../../../redux/reducers/profileReducer";

const Posts = (props) => {
    let posts = props.postsData.map(post => <Post
        key={post.id}
        author={post.author}
        date={post.date}
        title={post.title}
        text={post.text}
        url={post.url}
    />)

    let addPost = () => {
        props.dispatch(addPostAC());
    }

    let onPostChange = (e) => {
        let newText = e.target.value;
        props.dispatch(updateNewPostTextAC(newText));
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
