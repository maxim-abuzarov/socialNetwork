import usersReducer, {actions, follow, InitialStateType} from '../redux/reducers/usersReducer'
import {usersAPI} from '../api/usersAPI'
import {APIResponseType, ResultCodes} from '../api/api'

jest.mock('../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

let state: InitialStateType

beforeEach(() => {
	state = {
		users: [
			{
				id: 0,
				name: 'User 0',
				followed: false,
				photos: {small: null, large: null},
				status: 'status 0'
			},
			{
				id: 1,
				name: 'User 1',
				followed: false,
				photos: {small: null, large: null},
				status: 'status 1'
			},
			{
				id: 2,
				name: 'User 2',
				followed: true,
				photos: {small: null, large: null},
				status: 'status 2'
			},
			{
				id: 3,
				name: 'User 3',
				followed: true,
				photos: {small: null, large: null},
				status: 'status 3'
			}
		],
		followingProgress: [],
		isLoading: false,
		pageSize: 12,
		totalUsersCount: 0,
		currentPage: 1
	}
})

test('Follow success', () => {
	const newState = usersReducer(state, actions.followSuccess(1))

	expect(newState.users[0].followed).toBeFalsy()
	expect(newState.users[1].followed).toBeTruthy()
})

test('Unfollow success', () => {
	const newState = usersReducer(state, actions.unfollowSuccess(3))

	expect(newState.users[2].followed).toBeTruthy()
	expect(newState.users[3].followed).toBeFalsy()
})

test('Follow thunk success', async () => {
	const thunk = follow(1)
	const dispatchMock = await jest.fn()
	const getStateMock = jest.fn()
	const result: APIResponseType = {
		resultCode: ResultCodes.Success,
		messages: [],
		data: {}
	}

	usersAPIMock.follow.mockResolvedValue(result)

	await thunk(dispatchMock, getStateMock, {})

	expect(dispatchMock).toBeCalledTimes(4)
	expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
	expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
	expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.toggleFollowingProgress(false, 1))
})
