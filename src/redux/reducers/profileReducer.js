import avatar from './../../assets/img/unknownUser.jpeg';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    postsData: [
        {id: 1, author: 'Maxim Abuzarov', date: '30 Aug 2021', title: 'Post #1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', url: avatar},
        {id: 2, author: 'Yuri Zaikov', date: '12 Aug 2021', title: 'Post #2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', url: avatar},
        {id: 3, author: 'Tamirlan Tuyakov', date: '01 March 2021', title: 'Post #3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', url: avatar},
    ],
    newPostText: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                author: 'Maxim Abuzarov',
                date: '15 June 2021',
                title: 'Post #4',
                text: state.newPostText,
                url: avatar,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: '',
            }

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            }

        default:
            return state;
    }
}

export const addPostAC = () => ({type: ADD_POST})

export const updateNewPostTextAC = (newText) => ({type: UPDATE_NEW_POST_TEXT, newText})

export default profileReducer;
