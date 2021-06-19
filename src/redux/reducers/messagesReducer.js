const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messagesData: [],
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.newMessageText
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            }

        default:
            return state;
    }
}

export const sendMessage = (newMessageText) => ({type: SEND_MESSAGE, newMessageText})

export default messagesReducer;
