import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ErrorBanner from '../../../components/Banner'
import { defaultUser, UserType } from '../../../Types'

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
        setMatching(true)
        setLoading(true)
        if (newPass !== confirmNewPass) {
            setMatching(false)
        } else {
            await axios.post('/api/UpdatePassword', { newPass: newPass, uid: userID })
            localStorage.setItem('curUserID', userID as string)
            window.location.pathname = '/user/dashboard'
        }

        setLoading(false)
    }

    return (
        <div>
            {loadingPage ? (
                <>Loading...</>
            ) : (
                <div className='flex items-center justify-center w-screen h-screen'>
                    {!matching && (
                        <ErrorBanner
                            close={() => setMatching(true)}
                            message='Passwords must match'
                            type='error'
                        />
                    )}
                    <form
                        action='#'
                        onSubmit={(e) => handleSubmit(e)}
                        className='flex flex-col gap-4 justify-center items-center outline outline-1 p-8 w-4/5 min-w-fit max-w-lg'>
                        <label className='flex flex-row gap-2'>
                            New password:{' '}
                            <input
                                className='transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'
                                type={showPasswords ? 'text' : 'password'}
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-row gap-2'>
                            Confirm new password:{' '}
                            <input
                                className='transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'
                                type={showPasswords ? 'text' : 'password'}
                                value={confirmNewPass}
                                onChange={(e) => setConfirmNewPass(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-row justify-center items-center gap-2'>
                            <input
                                type='checkbox'
                                checked={showPasswords}
                                onChange={(e) => setShowPasswords(e.target.checked)}
                            />
                            Show passwords
                        </label>
                        <button
                            className='transition-colors focus:outline-0 border-b-2 border-black px-1 text-black hover:text-orange-500 hover:border-orange-500 focus:text-orange-500 focus:border-orange-500 font-semibold'
                            type='submit'>
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ResetPassword
