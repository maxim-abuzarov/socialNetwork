import {sendMessage} from "../../redux/reducers/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        friends: state.aside.friends,
        messages: state.messagesPage.messagesData,
    }
}

export default compose(
    connect(mapStateToProps, {sendMessage}),
    withAuthRedirect,
)(Messages);
