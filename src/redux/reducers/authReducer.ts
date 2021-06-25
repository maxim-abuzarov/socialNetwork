import {ResultCodes, ResultCodesForCaptcha} from '../../api/api'
import {stopSubmit} from 'redux-form'
import {action} from './errorReducer'
import {BaseThunkType, InferActionTypes} from '../store'
import {authAPI} from '../../api/authAPI'
import {securityAPI} from '../../api/securityAPI'

type InitialStateType = typeof  initialState
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit> | ReturnType<typeof action.catchError>>

const initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    captchaUrl: null as null | string,
    isAuth: false
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
}

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await authAPI.authMe()

            if (data.resultCode === ResultCodes.Success) {
                const {id, login, email} = data.data
                dispatch(actions.setAuthUserData(id, email, login, true))
            }
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await authAPI.login(email, password, rememberMe, captcha)

            if (data.resultCode === ResultCodes.Success) {
                await dispatch(getAuthUserData())
            } else {
                if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
                    await dispatch(getCaptchaUrl())
                }
                const message = data.messages.length > 0 ? data.messages[0] : 'Wrong data'

                dispatch(stopSubmit('login', {_error: message}))
            }
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await securityAPI.getCaptchaUrl()
            const captchaUrl = data.url
            dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await authAPI.logout()

            if (data.resultCode === ResultCodes.Success) {
                dispatch(actions.setAuthUserData(null, null, null, false))
            }
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export default authReducer
