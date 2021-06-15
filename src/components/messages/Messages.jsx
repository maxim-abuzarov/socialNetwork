import React from 'react';
import messagesClasses from './messages.module.css';
import Message from "./message/Message";
import Friend from "./friend/Friend";
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/reducers/messagesReducer";

const Messages = (props) => {
    let friends = props.friendsData.map(friend => <Friend
        key={friend.id}
        name={friend.name}
        id={friend.id}
        url={friend.url}
    />)

    let messages = props.messagesData.map(message => <Message
        key={message.id}
        message={message.message}
    />)

    let sendMessage = () => {
        props.dispatch(sendMessageAC());
    }

    let onMessageChange = (e) => {
        let newText = e.target.value;
        props.dispatch(updateNewMessageTextAC(newText));
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
                        <textarea
                            placeholder='Write message to your friend'
                            onChange={onMessageChange}
                            value={props.newMessageText}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Messages;
