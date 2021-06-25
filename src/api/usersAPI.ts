import {GetItemsType, instance, APIResponseType} from './api'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 12) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
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
