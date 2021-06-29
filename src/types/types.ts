export type PostType = {
    id: string
    author: string
    date: string
    title: string
    text: string
    url: string
}
export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsType
    photos: PhotosType
}
export type UserType = {
    id: number
    name: string
    status: string | null
    photos: PhotosType
    followed: boolean
}
