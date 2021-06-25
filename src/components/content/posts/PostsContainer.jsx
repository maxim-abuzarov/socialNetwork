import {actions} from "../../../redux/reducers/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postsData,
    }
}

export default connect(mapStateToProps,
    {addPost: actions.addPost}
) (Posts);
