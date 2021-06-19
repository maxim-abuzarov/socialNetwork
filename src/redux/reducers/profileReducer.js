import avatar from './../../assets/img/unknownUser.jpeg';
import {profileAPI} from "../../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

let initialState = {
    postsData: [],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 1,
                author: 'Maxim Abuzarov',
                date: '15 June 2021',
                title: 'Post #1',
                text: action.newPostText,
                url: avatar,
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }

        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }

        default:
            return state;
    }
}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})

export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        });
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        });
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        });
}

export default profileReducer;
