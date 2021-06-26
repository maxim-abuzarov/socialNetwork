import {actions} from '../../redux/reducers/messagesReducer'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {AppStateType} from '../../redux/store'
import Messages from './Messages'
import {ComponentType} from 'react'

const mapStateToProps = (state: AppStateType) => {
    return {
        friends: state.aside.friends,
        messages: state.messagesPage.messagesData
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.sendMessage}),
    withAuthRedirect,
)(Messages)
