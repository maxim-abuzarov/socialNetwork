import {sendMessageAC, updateNewMessageTextAC} from "../../redux/reducers/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        friends: state.messagesPage.friendsData,
        messages: state.messagesPage.messagesData,
        newMessageText: state.messagesPage.newMessageText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageAC());
        },
        onMessageChange: (newText) => {
            dispatch(updateNewMessageTextAC(newText));
        }
    }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps) (Messages);

export default MessagesContainer;
