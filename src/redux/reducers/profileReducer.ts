import avatar from './../../assets/img/unknownUser.jpeg'
import {stopSubmit} from 'redux-form'
import {action} from './errorReducer'
import {PhotosType, PostType, ProfileType} from '../../types/types'
import {profileAPI} from '../../api/profileAPI'
import {BaseThunkType, InferActionTypes} from '../store'
import {ResultCodes} from '../../api/api'
import {v1} from 'uuid'

type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit> | ReturnType<typeof action.catchError>>

const initialState = {
    postsData: [] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: v1(),
                author: 'Maxim Abuzarov',
                date: '30 Aug 2021',
                title: 'Post #1',
                url: avatar,
                text: action.newPostText
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }

        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }

        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }

        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }

        default:
            return state
    }
}

export const actions = {
    addPost: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.getProfile(userId)
            dispatch(actions.setUserProfile(data))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.getStatus(userId)
            dispatch(actions.setStatus(data))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.updateStatus(status)
            if (data.resultCode === ResultCodes.Success) {
                dispatch(actions.setStatus(status))
            }
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.savePhoto(file)

            if (data.resultCode === ResultCodes.Success) {
                dispatch(actions.savePhotoSuccess(data.data.photos))
            }
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const saveProfileData = (profileData: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        try {
            const userId = getState().auth.userId
            const data = await profileAPI.saveProfileData(profileData)

            if (data.resultCode === ResultCodes.Success) {
                if (userId !== null) {
                    await dispatch(getUserProfile(userId))
                } else {
                    const message = `User's id can't be null`
                    dispatch(action.catchError(true, message))
                }
            } else {
                dispatch(stopSubmit('editProfile', {_error: data.messages[0]}))

                return Promise.reject(data.messages[0])
            }
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export default profileReducer
