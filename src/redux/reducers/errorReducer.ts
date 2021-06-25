import {InferActionTypes} from '../store'

type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof action>

const initialState = {
    error: false,
    errorMessage: null as null | string
}

const errorReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'CATCH_ERROR':
            return {
                ...state,
                error: action.error,
                errorMessage: action.errorMessage
            }

        default:
            return state
    }
}

export const action = {
    catchError: (error: boolean, errorMessage: null | string) => ({type: 'CATCH_ERROR', error, errorMessage} as const)
}

export default errorReducer
