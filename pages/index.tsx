import React from 'react'
import axios from '../node_modules/axios/index'

const Home = () => {
    async function handleSignup() {
        const newUser = {
            username: 'gawley',
            password: '123',
            fname: 'connor',
            lname: 'gawley',
            email: 'connor@example.com',
        }
        const res = await axios.post('/api/Signup', newUser)
        console.log(res)
    }
    async function handleDelete() {
        const userToDelete = {
            username: null,
        }
        const res = await axios.delete('/api/DeleteUser', { data: userToDelete })
        console.log(res)
    }

    return (
        <div>
            <button onClick={() => handleSignup()}>Add new user</button>
            <button onClick={() => handleDelete()}>Delete new user</button>
        </div>
    )
}

export default Home
