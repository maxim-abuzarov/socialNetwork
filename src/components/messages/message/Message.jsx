import React from 'react';
import messageClasses from './message.module.css';

const Message = ({message}) => {
    return (
        <div className={messageClasses.message}>
            <h3>{message}</h3>
        </div>
    );
};

export default Message;
