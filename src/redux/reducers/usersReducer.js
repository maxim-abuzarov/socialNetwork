import {usersAPI} from "../../api/api";

const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const TOGGLE_IS_LOADING = 'TOGGLE-IS-LOADING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE-FOLLOWING-PROGRESS';

let initialState = {
    users: [],
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber,
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount,
            }

        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            }

        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isLoading
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id !== action.userId)
            }

        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }

        default:
            return state;
    }
}

export const setUsers = (users) => ({type: SET_USERS, users})
export const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})
export const toggleFollowingProgress = (isLoading, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, isLoading, userId})
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount})
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber})
export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})

export const getUsers = (currentPage, pageSize) => {

    return async (dispatch) => {
        dispatch(toggleIsLoading(true));
        dispatch(setCurrentPage(currentPage))

        const data = await usersAPI.getUsers(currentPage, pageSize);

        dispatch(toggleIsLoading(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const follow = (userId) => {

    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

        const response = await usersAPI.follow(userId)

        if (response.data.resultCode === 0) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const unfollow = (userId) => {

    return async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));

        const response = await usersAPI.unfollow(userId);

        if (response.data.resultCode === 0) {
            dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export default usersReducer;
