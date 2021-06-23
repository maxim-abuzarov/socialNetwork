import React from 'react';
import postsClasses from './posts.module.css';
import Post from "./post/Post";
import {Field, reduxForm, reset} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../common/formsControl/FormsControl";

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

    let addPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={postsClasses.posts}>

            <div>
                <h1>Add post</h1>
            </div>

            <div className={postsClasses.addPost}>

                <ReduxPostForm onSubmit={addPost} />

            </div>

            {posts}

        </div>
    );
};

const maxLength30 = maxLengthCreator(30)

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name='newPostText' component={Textarea} placeholder='Add your post' validate={[requiredField, maxLength30]} />
            <div><button>Add</button></div>
        </form>
    )
}

const afterSubmit = (result, dispatch) => dispatch(reset('postForm'));

const ReduxPostForm = reduxForm({form: 'postForm', onSubmitSuccess: afterSubmit})(PostForm)

export default Posts;
