const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    friendsData: [
        {id: 1, name: 'Maxim', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
        {id: 2, name: 'Oleg', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
        {id: 3, name: 'Yury', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
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
            state.messagesData.push(newMessage);
            state.newMessageText = '';
            return state;

        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state;

        default:
            return state;
    }
}

export const sendMessageAC = () => ({type: SEND_MESSAGE})

export const updateNewMessageTextAC = (newText) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText})

export default messagesReducer;
