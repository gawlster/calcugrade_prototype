import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ErrorBanner from '../../../components/Banner'
import Button from '../../../components/Button'
import CustomForm from '../../../components/CustomForm'
import CustomInput from '../../../components/CustomInput'
import CustomLabel from '../../../components/CustomLabel'
import LoadingPage from '../../../components/LoadingPage'

const ResetPassword: NextPage = () => {
    const [loadingPage, setLoadingPage] = useState(true)
    const [matching, setMatching] = useState(true)
    const [loading, setLoading] = useState(false)

    const [newPass, setNewPass] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('')

    const [showPasswords, setShowPasswords] = useState(false)

    const router = useRouter()
    const { userID } = router.query

    useEffect(() => {
        async function getData() {
            if (userID) {
                setLoadingPage(false)
            } else {
                setLoadingPage(true)
            }
        }
        getData()
    }, [userID])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // validate the passwords match
        e.preventDefault()
        setLoading(true)
        if (newPass !== confirmNewPass) {
            setMatching(false)
        } else {
            await axios.post('/api/UpdatePassword', { newPass: newPass, uid: userID })
            localStorage.setItem('curUserID', userID as string)
            router.push('/user/dashboard')
        }

        setLoading(false)
    }

    return (
        <div>
            {loadingPage ? (
                <LoadingPage />
            ) : (
                <div className='flex items-center justify-center w-screen h-screen'>
                    {!matching && (
                        <ErrorBanner
                            close={() => setMatching(true)}
                            message='Passwords must match'
                            type='error'
                        />
                    )}
                    <div className='w-4/5 max-w-md'>
                        <CustomForm onSubmit={(e) => handleSubmit(e)}>
                            <h1 className='font-semibold text-center text-3xl text-dark'>
                                Almost there!
                            </h1>
                            <p className='-mt-2 text-center'>
                                Create a new password below. Try to remember this time!
                            </p>
                            <CustomLabel>
                                New password:{' '}
                                <CustomInput
                                    type={showPasswords ? 'text' : 'password'}
                                    value={newPass}
                                    onChange={(e) => {
                                        setNewPass(e.target.value)
                                        setMatching(true)
                                    }}
                                />
                            </CustomLabel>
                            <CustomLabel>
                                Confirm new password:{' '}
                                <CustomInput
                                    type={showPasswords ? 'text' : 'password'}
                                    value={confirmNewPass}
                                    onChange={(e) => {
                                        setConfirmNewPass(e.target.value)
                                        setMatching(true)
                                    }}
                                />
                            </CustomLabel>
                            <div>show password icons here</div>
                            <Button
                                className='w-full'
                                submit={true}
                                opposite={true}
                                onClick={() => void 0}>
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>
                        </CustomForm>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResetPassword
