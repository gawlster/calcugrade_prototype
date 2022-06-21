export type User = {
    _id: string
    username: string
    password: string
    fname: string
    lname: string
    email: string
}

export const defaultUser: User = {
    _id: '',
    username: '',
    password: '',
    fname: '',
    lname: '',
    email: '',
}
