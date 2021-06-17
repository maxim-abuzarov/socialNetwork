import {addPost, updateNewPostText} from "../../../redux/reducers/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
    }
}

const PostsContainer = connect(mapStateToProps,
    {addPost, updateNewPostText}
) (Posts);

export default PostsContainer;
