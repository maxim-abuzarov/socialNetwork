import React from 'react';
import messagesClasses from './messages.module.css';
import Message from "./message/Message";
import Friend from "./friend/Friend";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/formsControl/FormsControl";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

const Messages = (props) => {
    let friends = props.friends.map(friend => <Friend
        key={friend.id}
        name={friend.name}
        id={friend.id}
        url={friend.photos.large}
    />)

    let messages = props.messages.map(message => <Message
        key={message.id}
        message={message.message}
    />)

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageText)
    }

    return (
        <div className={messagesClasses.messages}>

            <div className={messagesClasses.leftCol}>

                <div>
                    <h1>Dialogs</h1>
                </div>

                <div className={messagesClasses.friends}>
                    {friends}
                </div>

            </div>

            <div className={messagesClasses.rightCol}>

                <div className={messagesClasses.head}>
                    <h1>Messages</h1>
                    {messages}
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

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} validate={[requiredField, maxLength300]} name='newMessageText' placeholder='Write message to your friend' />
            <button>Send</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'messagesAddMessageForm'})(AddMessageForm)

export default Messages;
