import {addPostAC, updateNewPostTextAC} from "../../../redux/reducers/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPostChange: (newText) => {
            dispatch(updateNewPostTextAC(newText));
        },
        addPost: () => {
            dispatch(addPostAC());
        },
    }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps) (Posts);

export default PostsContainer;
