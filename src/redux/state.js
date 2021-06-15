const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, author: 'Maxim Abuzarov', date: '30 Aug 2021', title: 'Post #1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
                {id: 2, author: 'Yuri Zaikov', date: '12 Aug 2021', title: 'Post #2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
                {id: 3, author: 'Tamirlan Tuyakov', date: '01 March 2021', title: 'Post #3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
            ],
            newPostText: '',
        },
        messagesPage: {
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
        },
        asideFriends: {
            friendsData: [
                {id: 1, name: 'Maxim', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
                {id: 2, name: 'Oleg', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
                {id: 3, name: 'Yury', url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg'},
            ],
        },
    },
    rerender() {},
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this.rerender = observer
    },
    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 4,
                author: 'Maxim Abuzarov',
                date: '15 June 2021',
                title: 'Post #4',
                text: this._state.profilePage.newPostText,
                url: 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/he.jpg',
            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = '';
            this.rerender();
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this.rerender();
        } else if (action.type === 'SEND-MESSAGE') {
            let newMessage = {
                id: 4,
                message: this._state.messagesPage.newMessageText
            };
            this._state.messagesPage.messagesData.push(newMessage);
            this._state.messagesPage.newMessageText = '';
            this.rerender();
        } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            this._state.messagesPage.newMessageText = action.newText;
            this.rerender()
        }
    },
}

export const addPostAC = () => ({type: ADD_POST})

export const updateNewPostTextAC = (newText) => ({type: UPDATE_NEW_POST_TEXT, newText})

export const sendMessageAC = () => ({type: SEND_MESSAGE})

export const updateNewMessageTextAC = (newText) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText})

export default store;
