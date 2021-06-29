import React, {FC, useEffect, useRef, useState} from 'react'
import chatPageClasses from './chatpage.module.css'
import {NavLink} from 'react-router-dom'
import {ChatMessageAPIType} from '../../api/chatApi'
import {useDispatch, useSelector} from 'react-redux'
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/reducers/chatReducer'
import {AppStateType} from '../../redux/store'

const ChatPage: FC = () => {
	return (
		<Chat />
	)
}

const Chat: FC = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(startMessagesListening())
		return () => {
			dispatch(stopMessagesListening())
		}
	}, [])

	return (
		<div className={chatPageClasses.wrapper}>
			<Messages />
			<AddMessage />
		</div>
	)
}

const Messages: FC = () => {
	const messages = useSelector((state: AppStateType) => state.chat.messages)
	const messagesAnchorRef = useRef<HTMLDivElement>(null)
	const [isAutoscroll, setIsAutoscroll] = useState(true)

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const element = e.currentTarget
		if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight) < 200) {
			!isAutoscroll && setIsAutoscroll(true)
		} else {
			isAutoscroll && setIsAutoscroll(false)
		}
	}

	useEffect(() => {
		if (isAutoscroll) {
			messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
		}
	}, [messages])

	return (
		<div className={chatPageClasses.messages} onScroll={scrollHandler} >
			{messages.map(message => <Message key={message.id} message={message} />)}
			<div ref={messagesAnchorRef}/>
		</div>
	)
}

const Message: FC<{message: ChatMessageAPIType}> = React.memo(({message}) => {
	return (
		<div className={chatPageClasses.message}>

			<NavLink to={"/profile/" + message.userId} className={chatPageClasses.header}>

				<div className={chatPageClasses.avatar}>
					<div className={chatPageClasses.avatarWrapper}>
						<img src={message.photo} alt="Author avatar"/>
					</div>
				</div>

				<div className={chatPageClasses.author}>
					<h4>{message.userName}</h4>
				</div>

			</NavLink>

			<div className={chatPageClasses.content}>
				<h2>{message.message}</h2>
			</div>

		</div>
	)
})

const AddMessage: FC = () => {
	const [message, setMessage] = useState('')
	const status = useSelector((state: AppStateType) => state.chat.status)
	const dispatch = useDispatch()

	const sendMessageHandler = () => {
		if (!message) {
			return
		}
		dispatch(sendMessage(message))
		setMessage('')
	}

	return (
		<div className={chatPageClasses.send}>
			<textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
			<button disabled={status !== 'Ready'} onClick={sendMessageHandler}>Send</button>
		</div>
	)
}

export default ChatPage
