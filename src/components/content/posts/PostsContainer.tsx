import {actions} from '../../../redux/reducers/profileReducer'
import Posts, {DispatchPropsType, MapPropsType} from './Posts'
import {connect} from 'react-redux'
import {AppStateType} from '../../../redux/store'

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.postsData,
    }
}

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,
    {addPost: actions.addPost}
) (Posts)
