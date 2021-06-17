import React from 'react';
import messagesClasses from './messages.module.css';
import Message from "./message/Message";
import Friend from "./friend/Friend";

const Messages = (props) => {
    let friends = props.friends.map(friend => <Friend
        key={friend.id}
        name={friend.name}
        id={friend.id}
        url={friend.url}
    />)

    let messages = props.messages.map(message => <Message
        key={message.id}
        message={message.message}
    />)

    let sendMessage = () => {
        props.sendMessage();
    }

    let onMessageChange = (e) => {
        let newText = e.target.value;
        props.updateNewMessageText(newText);
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
