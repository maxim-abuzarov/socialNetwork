import {getAuthUserData} from './authReducer'
import {BaseThunkType, InferActionTypes} from '../store'
import {action} from './errorReducer'

type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof action.catchError>>

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED':
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED'} as const)
}

export const initializeApp = (): ThunkType => {
    return async (dispatch) => {
        try {
            const promise = dispatch(getAuthUserData())

            Promise.all([promise]).then(() => {
                dispatch(actions.initializedSuccess())
            })
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export default appReducer
