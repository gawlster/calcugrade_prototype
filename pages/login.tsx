import React, { useState } from 'react'
import axios from '../node_modules/axios/index'

const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function handleSubmit(e: any) {
        e.preventDefault()

        const res = await axios.post('/api/login', { username, password })
        console.log(res)
    }

    async function handleChange(e: any, func: (s: string) => void) {
        func(e.target.value)
    }

    return (
        <div>
            <form action='#' onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Username:
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => handleChange(e, setUsername)}
                        placeholder='username'
                    />
                </label>
                <label>
                    Password:
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => handleChange(e, setPassword)}
                        placeholder='password'
                    />
                </label>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
