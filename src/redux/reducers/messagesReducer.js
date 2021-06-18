const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    messagesData: [],
    newMessageText: '',
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 4,
                message: state.newMessageText
            };
            return {
                ...state,
                newMessageText: '',
                messagesData: [...state.messagesData, newMessage],
            }

        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText
            }

        default:
            return state;
    }
}

export const sendMessage = () => ({type: SEND_MESSAGE})

export const updateNewMessageText = (newText) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText})

export default messagesReducer;
