import React from 'react'
import messageClasses from './message.module.css'
import { FC } from 'react'

type PropsType = {
    message: string
}

const Message: FC<PropsType> = ({message}) => {
    return (
        <div className={messageClasses.message}>
            <h3>{message}</h3>
        </div>
    )
}

export default Message
