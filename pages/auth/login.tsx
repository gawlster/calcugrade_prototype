import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import LoadingPage from '../../components/LoadingPage'
import CustomForm from '../../components/CustomForm'
import CustomLabel from '../../components/CustomLabel'
import Banner from '../../components/Banner'

const Login: NextPage = () => {
    const router = useRouter()

    const [loadingPage, setLoadingPage] = useState(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const [invalid, setInvalid] = useState(false)

    const [usingEmail, setUsingEmail] = useState(false)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        // check if user is already logged in
        async function getData() {
            const uid = localStorage.getItem('curUserID')
            if (uid) {
                // already logged in
                router.push('/user/dashboard')
            } else {
                setLoadingPage(false)
            }
        }
        getData()
    }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoadingSubmit(true)
        try {
            if (usingEmail) {
                const res = await axios.post('/api/Login', { email, password })
                const userID = res.data._id
                localStorage.setItem('curUserID', userID)
                router.push('/user/dashboard')
            } else {
                const res = await axios.post('/api/Login', { username, password })
                const userID = res.data._id
                localStorage.setItem('curUserID', userID)
                router.push('/user/dashboard')
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response!.data.message === 'INVALID') {
                    setInvalid(true)
                }
            }
        }
        setLoadingSubmit(false)
    }

    async function handleForgotPassword() {
        router.push('/auth/forgot-password')
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            {invalid && (
                <div className='w-screen h-screen absolute left-0 top-0'>
                    <Banner
                        close={() => setInvalid(false)}
                        message={`Sorry, invalid ${usingEmail ? 'email' : 'username'} or password`}
                        type='error'
                    />
                </div>
            )}
            {loadingPage ? (
                <LoadingPage />
            ) : (
                <div className='w-4/5 max-w-md'>
                    <CustomForm onSubmit={(e) => handleSubmit(e)}>
                        <h1 className='font-semibold text-center text-3xl text-dark'>Log in</h1>
                        <CustomLabel>
                            {usingEmail ? 'Email:' : 'Username:'}
                            <input
                                value={usingEmail ? email : username}
                                onChange={(e) =>
                                    usingEmail
                                        ? setEmail(e.target.value)
                                        : setUsername(e.target.value)
                                }
                                type={usingEmail ? 'email' : 'text'}
                                className='transition-colors outline-0 focus:outline-0 p-3 border border-dark focus:border-light'
                            />
                        </CustomLabel>
                        <CustomLabel>
                            <div className='flex flex-row gap-2 items-center'>
                                Password:{' '}
                                {showPassword ? (
                                    <FontAwesomeIcon
                                        onClick={() => setShowPassword(false)}
                                        className='cursor-pointer'
                                        icon={faEyeSlash}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        onClick={() => setShowPassword(true)}
                                        className='cursor-pointer'
                                        icon={faEye}
                                    />
                                )}
                            </div>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                className='transition-colors outline-0 focus:outline-0 p-3 border border-dark focus:border-light'
                            />
                        </CustomLabel>
                        <div className='flex flex-row items-center justify-between text-center'>
                            <div
                                className='cursor-pointer select-none'
                                onClick={() => setUsingEmail(!usingEmail)}>
                                {usingEmail ? 'Log in with Username' : 'Log in with Email'}
                            </div>
                            <div onClick={() => handleForgotPassword()} className='cursor-pointer'>
                                Forgot password?
                            </div>
                        </div>
                        <div className='w-full flex'>
                            <Button
                                onClick={() => void 0}
                                submit={true}
                                className='w-full'
                                opposite={true}>
                                {loadingSubmit ? 'Loading...' : 'Log in'}
                            </Button>
                        </div>
                        <div className='flex flex-row gap-1 justify-center items-center text-center'>
                            <div>Not a member? </div>
                            <div className='font-bold text-mid'>
                                <Link href='/auth/signup'>Register.</Link>
                            </div>
                        </div>
                    </CustomForm>
                </div>
            )}
        </div>
    )
}

export default Login
