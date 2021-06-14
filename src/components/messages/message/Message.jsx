import React from 'react';
import messageClasses from './message.module.css';

const Message = () => {
    return (
        <div className={messageClasses.message}>
            <h3>Message from friend</h3>
        </div>
    );
};

export default Message;
