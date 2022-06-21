import axios from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Logout } from '../hooks/Logout'

const Signup: NextPage = () => {
    const [userID, setUserID] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [fname, setFName] = useState<string>('')
    const [lname, setLName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                setUserID(curUserID)
            }
        }
        getData()
    }, [])

    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)
        try {
            const newUser = await axios.post('/api/Signup', {
                username,
                password,
                fname,
                lname,
                email,
            })
            const newUserID = newUser.data.newUserID
            localStorage.setItem('curUserID', newUserID)
            window.location.pathname = '/dashboard'
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    return (
        <div className='p-4'>
            {userID ? (
                <div>
                    <p>Already logged in.</p>
                    <div>
                        <button onClick={() => Logout()}>Log out</button>
                        <button onClick={() => (window.location.pathname = '/dashboard')}>
                            View my dashboard
                        </button>
                    </div>
                </div>
            ) : (
                <form action='#' onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-4'>
                    <label className='flex flex-row gap-2'>
                        Username:
                        <input
                            className='outline outline-2'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label className='flex flex-row gap-2'>
                        Password:
                        <input
                            className='outline outline-2'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>
                            Show Password
                            <input
                                type='checkbox'
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                        </label>
                    </label>
                    <label className='flex flex-row gap-2'>
                        First name:
                        <input
                            className='outline outline-2'
                            type='text'
                            value={fname}
                            onChange={(e) => setFName(e.target.value)}
                        />
                    </label>
                    <label className='flex flex-row gap-2'>
                        Last name:
                        <input
                            className='outline outline-2'
                            type='text'
                            value={lname}
                            onChange={(e) => setLName(e.target.value)}
                        />
                    </label>
                    <label className='flex flex-row gap-2'>
                        Email:
                        <input
                            className='outline outline-2'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <button type='submit'>{loading ? 'Loading...' : 'Sign up'}</button>
                </form>
            )}
        </div>
    )
}

export default Signup
