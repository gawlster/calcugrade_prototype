import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AlreadyLoggedIn from '../components/AlreadyLoggedIn'
import Banner from '../components/Banner'
import Link from 'next/link'

const Signup: NextPage = () => {
    const [invalidUsername, setInvalidUsername] = useState<boolean>(false)
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
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
            if (err instanceof AxiosError) {
                if (err.response!.data.message === 'USERNAME TAKEN') {
                    setInvalidUsername(true)
                } else if (err.response!.data.message === 'EMAIL TAKEN') {
                    setInvalidEmail(true)
                }
            } else {
                console.error(err)
            }
        }
        setLoading(false)
    }

    return (
        <div className='w-screen h-screen'>
            {userID ? (
                <AlreadyLoggedIn />
            ) : (
                <div className='h-full w-full flex flex-col gap-4 items-center justify-center text-center'>
                    {invalidUsername && (
                        <Banner
                            message='Sorry, username already taken. Login instead?'
                            type='error'
                            close={() => setInvalidUsername(false)}
                        />
                    )}
                    {invalidEmail && (
                        <Banner
                            message='Sorry, email already in use. Login instead?'
                            type='error'
                            close={() => setInvalidEmail(false)}
                        />
                    )}
                    <div className='p-2'>
                        <h1 className='text-xl font-bold'>
                            Sign up for Calcugrade to take back control of your grades
                        </h1>
                    </div>
                    <form
                        action='#'
                        onSubmit={(e) => handleSubmit(e)}
                        className='flex flex-col gap-4 justify-center items-center outline outline-1 p-8 w-4/5 min-w-fit'>
                        <label className='flex flex-row gap-2'>
                            Username:
                            <input
                                className={`transition-colors focus:outline-0 border-b-2 focus:border-orange-500 ${
                                    invalidUsername
                                        ? 'border-red-500 text-red-500 font-bold'
                                        : 'border-black text-black font-normal'
                                }`}
                                type='text'
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    setInvalidUsername(false)
                                }}
                            />
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
                        <label className='flex flex-row gap-2'>
                            First name:
                            <input
                                className='transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'
                                type='text'
                                value={fname}
                                onChange={(e) => setFName(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-row gap-2'>
                            Last name:
                            <input
                                className='transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'
                                type='text'
                                value={lname}
                                onChange={(e) => setLName(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-row gap-2'>
                            Email:
                            <input
                                className={`transition-colors focus:outline-0 border-b-2 focus:border-orange-500 ${
                                    invalidEmail
                                        ? 'border-red-500 text-red-500 font-bold'
                                        : 'border-black text-black font-normal'
                                }`}
                                type='text'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setInvalidEmail(false)
                                }}
                            />
                        </label>
                        <button
                            className='transition-colors focus:outline-0 border-b-2 border-black px-1 text-black hover:text-orange-500 hover:border-orange-500 focus:text-orange-500 focus:border-orange-500 font-semibold'
                            type='submit'>
                            {loading ? 'Loading...' : 'Sign up'}
                        </button>
                    </form>
                    <div className=''>
                        Already have an account?{' '}
                        <div className='transition-colors inline text-orange-500 font-bold hover:text-black'>
                            <Link href='/login'>Login instead.</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Signup
