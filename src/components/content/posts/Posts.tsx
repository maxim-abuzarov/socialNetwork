import React, {FC} from 'react'
import postsClasses from './posts.module.css'
import Post from './post/Post'
import {AddPostForm} from './addPostForm/AddPostForm'
import {PostType} from '../../../types/types'

export type NewPostValuesFormType = {
    newPostText: string
}
export type MapPropsType = {
    posts: PostType[]
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
type PropsType = MapPropsType & DispatchPropsType

const Posts: FC<PropsType> = (props) => {
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

    let addPost = (values: NewPostValuesFormType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={postsClasses.posts}>
            <div>
                <h1>Add post</h1>
            </div>

            <div className={postsClasses.addPost}>
                <AddPostForm onSubmit={addPost} />
            </div>

            {posts}
        </div>
    )
}

export default Posts
