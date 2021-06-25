import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import profileReducer from './reducers/profileReducer'
import messagesReducer from './reducers/messagesReducer'
import asideReducer from './reducers/asideReducer'
import usersReducer from './reducers/usersReducer'
import authReducer from './reducers/authReducer'
import appReducer from './reducers/appReducer'
import errorReducer from './reducers/errorReducer'

// types for all app state
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// types for actions
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

// types for thunks
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    aside: asideReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    error: errorReducer,
    form: formReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
