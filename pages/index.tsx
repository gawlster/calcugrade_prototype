import { NextPage } from 'next'
import { useEffect } from 'react'
import Button from '../components/Button'
import GithubLink from '../components/GithubLink'

const Home: NextPage = () => {
    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                window.location.pathname = '/user/dashboard'
            }
        }
        getData()
    }, [])

    async function handleLoginClick() {
        window.location.pathname = '/auth/login'
    }
    async function handleSignupClick() {
        window.location.pathname = '/auth/signup'
    }
    return (
        <div className='min-w-screen min-h-screen flex flex-col gap-6 items-center justify-center text-center'>
            <div className='flex flex-col gap-2 px-8 tablet:px-4'>
                <h1 className='text-6xl font-bold text-dark'>Calcugrade</h1>
                <p className=''>
                    Grades are hard. Make it easier by monitoring your courses real time, for free.
                </p>
            </div>
            <div className='flex flex-row gap-4 items-center'>
                <Button className='' onClick={() => handleLoginClick()}>
                    Login
                </Button>
                <Button className='' onClick={() => handleSignupClick()}>
                    Sign Up
                </Button>
            </div>
            <GithubLink />
        </div>
    )
}

export default Home
