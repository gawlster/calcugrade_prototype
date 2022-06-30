import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import LoadingPage from '../../components/LoadingPage'
import CustomForm from '../../forms/CustomForm'

const Login: NextPage = () => {
    const router = useRouter()

    const [loadingPage, setLoadingPage] = useState(true)

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

    async function handleSubmit() {}

    return (
        <div>
            {loadingPage ? (
                <LoadingPage />
            ) : (
                <CustomForm onSubmit={() => handleSubmit()}>
                    <label>
                        hello
                        <input type='text' />
                    </label>
                    <label>
                        goodbye
                        <input type='text' />
                    </label>
                    <label>
                        hjfh
                        <input type='text' />
                    </label>
                    <label>
                        ghkjsdhgkjshgk
                        <input type='text' />
                    </label>
                </CustomForm>
            )}
        </div>
    )
}

export default Login
