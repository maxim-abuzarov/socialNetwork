import {usersAPI} from "../../api/api";
import {catchError} from "./errorReducer";

const GET_FRIENDS = 'GET-FRIENDS';
const TOGGLE_IS_LOADING = 'TOGGLE-IS-LOADING';

let initialState = {
    friends: [],
    isLoading: false,
}

const asideReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FRIENDS:
            return {
                ...state,
                friends: action.friends,
            }

        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            }

        default:
            return state;
    }
}

export const getFriends = (friends) => ({type: GET_FRIENDS, friends})
export const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})

export const getFriendsList = () => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsLoading(true));

            const data = await usersAPI.getFriends();

            dispatch(toggleIsLoading(false));
            dispatch(getFriends(data.items));
        } catch (e) {
            const message = e.message
            dispatch(catchError(true, message))
        }
    }
}

export default asideReducer;
