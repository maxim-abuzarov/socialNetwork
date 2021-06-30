import {getFriendsList} from './asideReducer'
import {action} from './errorReducer'
import {UserType} from '../../types/types'
import {BaseThunkType, InferActionTypes} from '../store'
import {usersAPI} from '../../api/usersAPI'
import {ResultCodes} from '../../api/api'

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof action.catchError>>

const initialState = {
    users: [] as UserType[],
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingProgress: [] as number[], // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    },
    isFollow: false
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }

        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber
            }

        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }

        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount
            }

        case 'TOGGLE_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }

        case 'TOGGLE_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingProgress: action.isLoading
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id !== action.userId)
            }

        case 'IS_FOLLOW':
            return {
                ...state,
                isFollow: action.isFollow
            }

        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }

        default:
            return state
    }
}

export const actions = {
    toggleFollowingProgress: (isLoading: boolean, userId: number) => ({
        type: 'TOGGLE_FOLLOWING_PROGRESS',
        isLoading,
        userId
    } as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    toggleIsLoading: (isLoading: boolean) => ({type: 'TOGGLE_IS_LOADING', isLoading} as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),
    setCurrentPage: (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const),
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    isFollow: (isFollow: boolean) => ({type: 'IS_FOLLOW', isFollow} as const)
}

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleIsLoading(true))
            dispatch(actions.setCurrentPage(currentPage))
            dispatch(actions.setFilter(filter))
            const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
            dispatch(actions.toggleIsLoading(false))
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalUsersCount(data.totalCount))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const isFollowedUser = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await usersAPI.isFollow(userId)
            // @ts-ignore
            dispatch(actions.isFollow(data))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleFollowingProgress(true, userId))
            const data = await usersAPI.follow(userId)

            if (data.resultCode === ResultCodes.Success) {
                dispatch(actions.followSuccess(userId))
                dispatch(actions.isFollow(true))
                await dispatch(getFriendsList())
            }
            dispatch(actions.toggleFollowingProgress(false, userId))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleFollowingProgress(true, userId))
            const data = await usersAPI.unfollow(userId)

            if (data.resultCode === ResultCodes.Success) {
                dispatch(actions.unfollowSuccess(userId))
                dispatch(actions.isFollow(false))
                await dispatch(getFriendsList())
            }
            dispatch(actions.toggleFollowingProgress(false, userId))
        } catch (e) {
            const message = e.message
            dispatch(action.catchError(true, message))
        }
    }
}

export default usersReducer
