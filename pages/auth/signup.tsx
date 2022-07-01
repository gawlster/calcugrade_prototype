import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios, { Axios, AxiosError } from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Banner from '../../components/Banner'
import Button from '../../components/Button'
import CustomForm from '../../components/CustomForm'
import CustomLabel from '../../components/CustomLabel'
import LoadingPage from '../../components/LoadingPage'

const Signup: NextPage = () => {
    const router = useRouter()

    const [loadingPage, setLoadingPage] = useState(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const [usernameInvalid, setUsernameInvalid] = useState(false)
    const [emailInvalid, setEmailInvalid] = useState(false)

    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
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
            const res = await axios.post('/api/Signup', { username, password, fname, lname, email })
            const userID = res.data.newUserID
            localStorage.setItem('curUserID', userID)
            router.push('/user/dashboard')
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response!.data.message === 'USERNAME TAKEN') {
                    setUsernameInvalid(true)
                }
                if (err.response!.data.message === 'EMAIL TAKEN') {
                    setEmailInvalid(true)
                }
            }
        }

        setLoadingSubmit(false)
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            {usernameInvalid && (
                <div className='w-screen h-screen absolute left-0 top-0'>
                    <Banner
                        close={() => setUsernameInvalid(false)}
                        message='Sorry, username already taken'
                        type='error'
                    />
                </div>
            )}
            {emailInvalid && (
                <div className='w-screen h-screen absolute left-0 top-0'>
                    <Banner
                        close={() => setEmailInvalid(false)}
                        message='Sorry, email already in use'
                        type='error'
                    />
                </div>
            )}
            {loadingPage ? (
                <LoadingPage />
            ) : (
                <div className='w-4/5 max-w-md'>
                    <CustomForm onSubmit={(e) => handleSubmit(e)}>
                        <h1 className='font-semibold text-center text-3xl text-dark'>Sign up</h1>
                        <div className='flex flex-row gap-2 justify-between w-full overflow-hidden'>
                            <CustomLabel half={true}>
                                First name:
                                <input
                                    value={fname}
                                    onChange={(e) => setFName(e.target.value)}
                                    type='text'
                                    className='transition-colors outline-0 focus:outline-0 p-3 border border-dark focus:border-light'
                                />
                            </CustomLabel>
                            <CustomLabel half={true}>
                                Last name:
                                <input
                                    value={lname}
                                    onChange={(e) => setLName(e.target.value)}
                                    type='text'
                                    className='transition-colors outline-0 focus:outline-0 p-3 border border-dark focus:border-light'
                                />
                            </CustomLabel>
                        </div>
                        <CustomLabel>
                            Username:
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type='text'
                                className='transition-colors outline-0 focus:outline-0 p-3 border border-dark focus:border-light'
                            />
                        </CustomLabel>
                        <CustomLabel>
                            Email:
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
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
                        <div className='w-full flex'>
                            <Button
                                onClick={() => void 0}
                                submit={true}
                                className='w-full'
                                opposite={true}>
                                {loadingSubmit ? 'Loading...' : 'Sign up'}
                            </Button>
                        </div>
                        <div className='flex flex-row gap-1 justify-center items-center text-center'>
                            <div>Already have an account? </div>
                            <div className='font-bold text-mid'>
                                <Link href='/auth/login'>Log in.</Link>
                            </div>
                        </div>
                    </CustomForm>
                </div>
            )}
        </div>
    )
}

export default Signup
