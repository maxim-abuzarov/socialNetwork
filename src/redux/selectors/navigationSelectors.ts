import {AppStateType} from '../store'

export const getFriends = (state: AppStateType) => {
	return state.aside.friends
}

export const getIsLoading = (state: AppStateType) => {
	return state.aside.isLoading
}
