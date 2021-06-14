import React from 'react';
import messagesClasses from './messages.module.css';
import Message from "./message/Message";
import Friend from "./friend/Friend";

const Messages = () => {
    return (
        <div className={messagesClasses.messages}>

            <div className={messagesClasses.header}>

                <div className={messagesClasses.head}>
                    <h1>Dialogs</h1>
                </div>

                <div className={messagesClasses.friends}>
                    <Friend />
                </div>

            </div>

            <div className={messagesClasses.dialogs}>

                <div className={messagesClasses.head}>
                    <h1>Messages</h1>
                </div>

                <Message />

                <div className={messagesClasses.write}>

                    <div className={messagesClasses.head}>
                        <h1>Write message</h1>
                    </div>

                    <div className={messagesClasses.writeMessage}>
                        <textarea placeholder='Write message to your friend'>Write message to your friend</textarea>
                        <button>Send</button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Messages;
