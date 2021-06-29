import {action} from './errorReducer'
import {BaseThunkType, InferActionTypes} from '../store'
import {chatAPI, ChatMessageAPIType, StatusType} from '../../api/chatApi'
import {Dispatch} from 'redux'
import {v1} from 'uuid'

type InitialStateType = typeof  initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof action.catchError>>
type ChatMessageType = ChatMessageAPIType & {id: string}

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'Pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages
                    .map( m => ( {...m, id: v1()} ) )]
                    .filter((m, index, array) => index >= array.length - 100)
            }

        case 'CLEAR_MESSAGES':
            return {
                ...state,
                messages: action.payload.messages
            }

        case 'STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }

        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({type: 'MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) => ({type: 'STATUS_CHANGED', payload: {status}} as const),
    clearMessages: (messages: ChatMessageType[]) => ({type: 'CLEAR_MESSAGES', payload: {messages}} as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        try {
            chatAPI.start()
            chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
            chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        try {
            chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
            chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
            chatAPI.stop()
            dispatch(actions.clearMessages([]))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async (dispatch) => {
        try {
            chatAPI.sendMessage(message)
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export default chatReducer
