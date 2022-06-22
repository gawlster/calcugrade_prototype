import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AlreadyLoggedIn from '../components/AlreadyLoggedIn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Login: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const [userID, setUserID] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
        setLoading(false)
    }

    return (
        <div className='w-screen h-screen'>
            {userID ? (
                <AlreadyLoggedIn />
            ) : (
                <div className='h-full flex flex-col gap-4 items-center justify-center text-center'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            Login to Calcugrade to start tracking and making progress
                        </h1>
                    </div>
                    <form
                        action='#'
                        onSubmit={(e) => handleSubmit(e)}
                        className='flex flex-col gap-4 justify-center items-center outline outline-1 p-8 w-4/5 min-w-fit'>
                        <label className='flex flex-row gap-2'>
                            Username:
                            <input
                                className='transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label className='opacity-0'>
                                <FontAwesomeIcon icon={faEyeSlash} />

                                <input
                                    className='hidden'
                                    type='checkbox'
                                    checked={showPassword}
                                    onChange={(e) => {}}
                                />
                            </label>
                        </label>
                        <label className='flex flex-row gap-2'>
                            Password:
                            <input
                                className='transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className='cursor-pointer'>
                                {showPassword ? (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} />
                                )}
                                <input
                                    className='hidden'
                                    type='checkbox'
                                    checked={showPassword}
                                    onChange={(e) => setShowPassword(e.target.checked)}
                                />
                            </label>
                        </label>
                        <button
                            className='transition-colors focus:outline-0 border-b-2 border-black px-1 text-black hover:text-orange-500 hover:border-orange-500 focus:text-orange-500 focus:border-orange-500 font-semibold'
                            type='submit'>
                            {loading ? 'Loading...' : 'Log in'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Login
