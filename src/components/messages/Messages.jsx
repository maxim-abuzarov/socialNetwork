import React from 'react';
import messagesClasses from './messages.module.css';
import Message from "./message/Message";
import Friend from "./friend/Friend";
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../common/formsControl/FormsControl";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

const Messages = ({friends, messages, sendMessage}) => {
    let friendsList = friends.map(friend => <Friend
        key={friend.id}
        name={friend.name}
        id={friend.id}
        url={friend.photos.large}
    />)

    let messagesList = messages.map(message => <Message
        key={message.id}
        message={message.message}
    />)

    let addNewMessage = (values) => {
        sendMessage(values.newMessageText)
    }

    return (
        <div className={messagesClasses.messages}>

            <div className={messagesClasses.leftCol}>

                <div>
                    <h1>Dialogs</h1>
                </div>

                <div className={messagesClasses.friends}>
                    {friendsList.length !== 0
                        ? friendsList
                        : 'Follow somebody'
                    }
                </div>

            </div>

            <div className={messagesClasses.rightCol}>

                <div className={messagesClasses.head}>
                    <h1>Messages</h1>
                    {messagesList}
                </div>

                <div className={messagesClasses.write}>

                    <div className={messagesClasses.writeMessage}>

                        <AddMessageFormRedux onSubmit={addNewMessage} />

                    </div>

                </div>

            </div>

        </div>
    );
};

const maxLength300 = maxLengthCreator(300)

const AddMessageForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field component={Textarea} validate={[requiredField, maxLength300]} name='newMessageText' placeholder='Write message to your friend' />
            <button>Send</button>
        </form>
    )
}

const afterSubmit = (result, dispatch) => dispatch(reset('messagesAddMessageForm'));

const AddMessageFormRedux = reduxForm({form: 'messagesAddMessageForm', onSubmitSuccess: afterSubmit})(AddMessageForm)

export default Messages;
