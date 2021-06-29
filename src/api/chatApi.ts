export type ChatMessageAPIType = {
	message: string
	photo: string
	userId: number
	userName: string
}
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
type EventsNamesTypes = 'message-received' | 'status-changed'
export type StatusType = 'Pending' | 'Ready' | 'Error'

const subscribers = {
	'message-received': [] as MessagesReceivedSubscriberType[],
	'status-changed': [] as StatusChangedSubscriberType[]
}
let ws: WebSocket | null

const closeHandler = () => {
	notifySubscribers('Pending')
	setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
	const newMessages = JSON.parse(e.data)
	subscribers['message-received'].forEach(subscriber => subscriber(newMessages))
}
const openHandler = () => {
	notifySubscribers('Ready')
}
const errorHandler = () => {
	notifySubscribers('Error')
}
const cleanUp = () => {
	ws?.removeEventListener('close', closeHandler)
	ws?.removeEventListener('message', messageHandler)
	ws?.removeEventListener('open', openHandler)
	ws?.removeEventListener('error', errorHandler)
}
const notifySubscribers = (status: StatusType) => {
	subscribers['status-changed'].forEach(subscriber => subscriber(status))
}
const createChannel = () => {
	cleanUp()
	ws?.close()
	ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
	notifySubscribers('Pending')
	ws?.addEventListener('close', closeHandler)
	ws?.addEventListener('message', messageHandler)
	ws?.addEventListener('open', openHandler)
	ws?.addEventListener('error', errorHandler)
}

export const chatAPI = {
	start() {
		createChannel()
	},

	stop() {
		subscribers['message-received'] = []
		subscribers['status-changed'] = []
		cleanUp()
		ws?.close()
	},

	subscribe(eventName: EventsNamesTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
		// @ts-ignore
		subscribers[eventName].push(callback)
		return () => {
			// @ts-ignore
			subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback)
		}
	},

	unsubscribe(eventName: EventsNamesTypes, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
		// @ts-ignore
		subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback)
	},

	sendMessage(message: string) {
		ws?.send(message)
	}
}
