import avatar from './../../assets/img/unknownUser.jpeg';
import {profileAPI} from "../../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

let initialState = {
    postsData: [],
    profile: null,
    status: null,
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

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }

        default:
            return state;
    }
}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);

    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);

    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileData = (profileData) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfileData(profileData);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}))

        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;
