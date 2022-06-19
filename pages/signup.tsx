import React, { useState } from 'react'
import axios from '../node_modules/axios/index'

const Signup = () => {
    const [error, setError] = useState<boolean>(false)
    const [usernameTaken, setUsernameTaken] = useState<boolean>(false)
    const [emailTaken, setEmailTaken] = useState<boolean>(false)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [fname, setFName] = useState<string>('')
    const [lname, setLName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    async function handleSubmit(e: any) {
        setError(false)
        setUsernameTaken(false)
        setEmailTaken(false)
        e.preventDefault()
        const newUser = {
            username,
            password,
            fname,
            lname,
            email,
        }
        try {
            const res = await axios.post('/api/Signup', newUser)
            const userID = res.data.insertedIds[0]
            console.log(userID)
        } catch (err) {
            setError(true)
            if (!err.response.data) {
                console.log(err)
            } else if (err.response.data.message === 'Username already taken') {
                setUsernameTaken(true)
            } else if (err.response.data.message === 'Email already in use') {
                setEmailTaken(true)
            }
        }
    }

    function handleChange(e: any, func: (s: string) => void) {
        func(e.target.value)
    }

    return (
        <div>
            {error && <div>Error!</div>}
            <form action='#' onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Username:
                    <input
                        className={`${usernameTaken && 'outline-dashed outline-4 outline-red-600'}`}
                        type='text'
                        value={username}
                        onChange={(e) => handleChange(e, setUsername)}
                        placeholder='username'
                    />
                    {usernameTaken && <div>Sorry, username already in use</div>}
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
                <label>
                    First name:
                    <input
                        type='text'
                        value={fname}
                        onChange={(e) => handleChange(e, setFName)}
                        placeholder='first name'
                    />
                </label>
                <label>
                    Last name:
                    <input
                        type='text'
                        value={lname}
                        onChange={(e) => handleChange(e, setLName)}
                        placeholder='last name'
                    />
                </label>
                <label>
                    Email:
                    <input
                        className={`${emailTaken && 'outline-dashed outline-4 outline-red-600'}`}
                        type='email'
                        value={email}
                        onChange={(e) => handleChange(e, setEmail)}
                        placeholder='email'
                    />
                    {emailTaken && <div>Sorry, email already in use</div>}
                </label>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
