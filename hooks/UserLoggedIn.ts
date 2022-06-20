import axios from '../node_modules/axios/index'
import type { User, NotLoggedIn } from '../Types'

async function isUserLoggedIn() {
    const loggedInUserID: string = localStorage.getItem('UserID')
    let user: any
    if (loggedInUserID) {
        // user logged in
        const res = await axios.get('/api/GetUser', { params: { userID: loggedInUserID } })
        console.log(res)
    } else {
        user = {
            message: 'No logged in user',
        }
    }
    return user
}

export { isUserLoggedIn }
