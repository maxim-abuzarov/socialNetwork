import {InferActionTypes} from '../store'

type InitialStateType = typeof initialState
export type MessagesType = {
    id: number
    message: string
}
type ActionsTypes = InferActionTypes<typeof actions>

const initialState = {
    messagesData: [] as MessagesType[]
}

const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            let newMessage = {
                id: 1,
                message: action.newMessageText
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }

        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageText: string) => ({type: 'SEND_MESSAGE', newMessageText} as const)
}

export default messagesReducer
