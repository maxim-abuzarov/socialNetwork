import {sendMessage, updateNewMessageText} from "../../redux/reducers/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        friends: state.messagesPage.friendsData,
        messages: state.messagesPage.messagesData,
        newMessageText: state.messagesPage.newMessageText
    }
}

const MessagesContainer = connect(mapStateToProps,
    {sendMessage, updateNewMessageText}
) (Messages);

export default MessagesContainer;
