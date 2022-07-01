import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Banner from '../../components/Banner'
import Button from '../../components/Button'
import CustomForm from '../../components/CustomForm'
import CustomInput from '../../components/CustomInput'
import CustomLabel from '../../components/CustomLabel'
import LoadingPage from '../../components/LoadingPage'

const ForgotPassword: NextPage = () => {
    const router = useRouter()

    const [loadingPage, setLoadingPage] = useState(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const [serverError, setServerError] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [success, setSuccess] = useState(false)

    const [usingEmail, setUsingEmail] = useState(false)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

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
                const res = await axios.post('/api/RecoverPassword', { email })
                if (res.status === 200) {
                    setSuccess(true)
                }
            } else {
                const res = await axios.post('/api/RecoverPassword', { username })
                if (res.status === 200) {
                    setSuccess(true)
                }
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response!.status === 400) {
                    setInvalid(true)
                } else {
                    setServerError(true)
                }
            }
        }

        setLoadingSubmit(false)
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            {invalid && (
                <div className='w-screen h-screen absolute left-0 top-0'>
                    <Banner
                        close={() => setInvalid(false)}
                        message={`Sorry, the ${
                            usingEmail ? 'email' : 'username'
                        } entered is not valid`}
                        type='error'
                    />
                </div>
            )}
            {serverError && (
                <div className='w-screen h-screen absolute left-0 top-0'>
                    <Banner
                        close={() => setInvalid(false)}
                        message='Sorry, there was an error on the server, please try again later.'
                        type='error'
                    />
                </div>
            )}
            {success && (
                <div className='w-screen h-screen absolute left-0 top-0'>
                    <Banner
                        close={() => setInvalid(false)}
                        message={`A message with a link to reset your password has been sent to your inbox.`}
                        type='success'
                        nox={true}
                    />
                </div>
            )}
            {loadingPage ? (
                <LoadingPage />
            ) : (
                <div className='w-4/5 max-w-md'>
                    <CustomForm onSubmit={(e) => handleSubmit(e)}>
                        <h1 className='font-semibold text-center text-3xl text-dark'>
                            Forgot your password?
                        </h1>
                        <p className='-mt-2 text-center'>
                            No worries. It happens to the best of us. Fill out your info below so we
                            can reset it for you.
                        </p>
                        <CustomLabel>
                            {usingEmail ? 'Email:' : 'Username:'}
                            <CustomInput
                                value={usingEmail ? email : username}
                                onChange={(e) =>
                                    usingEmail
                                        ? setEmail(e.target.value)
                                        : setUsername(e.target.value)
                                }
                                type={usingEmail ? 'email' : 'text'}
                            />
                        </CustomLabel>

                        <div
                            className='flex items-center justify-center cursor-pointer select-none'
                            onClick={() => setUsingEmail(!usingEmail)}>
                            {usingEmail ? 'Use Username instead' : 'Use Email instead'}
                        </div>

                        <div className='w-full flex'>
                            <Button
                                onClick={() => void 0}
                                submit={!success}
                                className='w-full'
                                opposite={true}>
                                {loadingSubmit ? 'Loading...' : 'Recover'}
                            </Button>
                        </div>
                        <div className='flex flex-row gap-1 justify-center items-center text-center'>
                            <div>Remembered? </div>
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

export default ForgotPassword
