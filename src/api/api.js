import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'a60e2925-9e48-4e88-a8f4-0ca5f14206c3'},
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 12) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },

    getFriends() {
        return instance.get(`users?friend=true`)
            .then(response => {
                return response.data
            });
    },

    authMe() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            });
    },
}