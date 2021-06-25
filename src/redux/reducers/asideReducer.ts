import {action} from './errorReducer'
import {UserType} from '../../types/types'
import {usersAPI} from '../../api/usersAPI'
import {BaseThunkType, InferActionTypes} from '../store'

type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof action.catchError>>

const initialState = {
    friends: [] as UserType[],
    isLoading: false
}

const asideReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'GET_FRIENDS':
            return {
                ...state,
                friends: action.friends
            }

        case 'TOGGLE_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state
    }
}

export const actions = {
    getFriends: (friends: UserType[]) => ({type: 'GET_FRIENDS', friends} as const),
    toggleIsLoading: (isLoading: boolean) => ({type: 'TOGGLE_IS_LOADING', isLoading} as const)
}

export const getFriendsList = (): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleIsLoading(true))
            const data = await usersAPI.getFriends()
            dispatch(actions.toggleIsLoading(false))
            dispatch(actions.getFriends(data.items))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export default asideReducer
