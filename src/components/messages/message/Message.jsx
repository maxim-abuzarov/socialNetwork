import React from 'react';
import messageClasses from './message.module.css';

const Message = (props) => {
    return (
        <div className={messageClasses.message}>
            <h3>{props.message}</h3>
        </div>
    );
};

export default Message;
