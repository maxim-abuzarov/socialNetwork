import {usersAPI} from "../../api/api";

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

    return (dispatch) => {
            dispatch(toggleIsLoading(true));

            usersAPI.getFriends()
                .then(data => {
                    dispatch(toggleIsLoading(false));
                    dispatch(getFriends(data.items));
                });
    }
}

export default asideReducer;
