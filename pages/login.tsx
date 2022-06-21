import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Login: NextPage = () => {
    const [userID, setUserID] = useState<string>('')

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function handleSubmit(e: any) {
        e.preventDefault()
        try {
            const res = await axios.post('/api/Login', { username, password })
            setUserID(res.data._id)
            localStorage.setItem('curUserID', res.data._id)
            if (typeof window !== 'undefined') {
                window.location.pathname = '/dashboard'
            } else {
                console.log('ERROR')
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                const errMsg = err.response!.data.message
                if (errMsg === 'INVALID') {
                    setPassword('')
                    alert('Invalid username or password. Please try again')
                }
            }
        }
    }

    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                setUserID(curUserID)
            }
        }
        getData()
    }, [])

    return (
        <div>
            {userID ? (
                <div>
                    <p>Already logged in.</p>
                    <div>
                        <button>Log out</button>
                        <button onClick={() => (window.location.pathname = '/dashboard')}>
                            View my dashboard
                        </button>
                    </div>
                </div>
            ) : (
                <div className='p-4'>
                    <form
                        action='#'
                        onSubmit={(e) => handleSubmit(e)}
                        className='flex flex-col gap-4'>
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
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Login
