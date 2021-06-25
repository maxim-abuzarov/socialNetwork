import axios from 'axios'
import {UserType} from '../types/types'

export type GetItemsType = {
    items: UserType[]
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodes> = {
    data: D
    messages: string[]
    resultCode: RC
}
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'a60e2925-9e48-4e88-a8f4-0ca5f14206c3'
    }
})
export enum ResultCodes {
    Success = 0,
    Error = 1
}
export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}
