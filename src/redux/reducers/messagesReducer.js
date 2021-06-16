import avatar from './../../assets/img/unknownUser.jpeg';

const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    friendsData: [
        {id: 1, name: 'Maxim', url: avatar},
        {id: 2, name: 'Oleg', url: avatar},
        {id: 3, name: 'Yury', url: avatar},
    ],
    messagesData: [
        {id: 1, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {id: 2, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {id: 3, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    ],
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

export const sendMessageAC = () => ({type: SEND_MESSAGE})

export const updateNewMessageTextAC = (newText) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText})

export default messagesReducer;
