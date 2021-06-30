import {GetItemsType, instance, APIResponseType} from './api'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 12, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data
            })
    },

    getFriends() {
        return instance.get<GetItemsType>(`users?friend=true`)
            .then(response => {
                return response.data
            })
    },

    isFollow(userId: number) {
        return instance.get<APIResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data
        }) as Promise<APIResponseType>
    }
}
