import React, {FC} from 'react'
import messagesClasses from './messages.module.css'
import Message from './message/Message'
import Friend from './friend/Friend'
import {UserType} from '../../types/types'
import {MessagesType} from '../../redux/reducers/messagesReducer'
import {AddMessageForm} from './addMessageForm/addMessageForm'

type PropsType = {
    friends: UserType[]
    messages: MessagesType[]
    sendMessage: (newMessageText: string) => void
}
export type NewMessageValuesFormType = {
    newMessageText: string
}

const Messages: FC<PropsType> = ({friends, messages, sendMessage}) => {
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

    let addNewMessage = (values: NewMessageValuesFormType) => {
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
                        <AddMessageForm onSubmit={addNewMessage} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Messages
