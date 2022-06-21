import { NextPage } from 'next'
import { useEffect } from 'react'

const loginClassNames = [
    'font-semibold',
    'py-1',
    'px-4',
    'border',
    'rounded',
    'tablet:py-2',
    'tablet:px-5',
    'tablet:text-lg',
    'laptop:py-3',
    'laptop:px-6',
    'laptop:text-xl',
    'text-orange-500',
    'bg-transparent',
    'border-orange-500',
    'hover:bg-orange-500',
    'hover:text-white',
    'hover:border-transparent',
    'transition-colors',
]
const signupClassNames = [
    'font-semibold',
    'py-1',
    'px-4',
    'border',
    'rounded',
    'tablet:py-2',
    'tablet:px-5',
    'tablet:text-lg',
    'laptop:py-3',
    'laptop:px-6',
    'laptop:text-xl',
    'text-white',
    'bg-orange-500',
    'border-transparent',
    'hover:bg-transparent',
    'hover:text-orange-500',
    'hover:border-orange-500',
    'transition-colors',
]

const Home: NextPage = () => {
    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                window.location.pathname = '/dashboard'
            }
        }
        getData()
    }, [])

    async function handleLoginClick() {
        window.location.pathname = '/login'
    }
    async function handleSignupClick() {
        window.location.pathname = '/signup'
    }
    return (
        <div className='h-screen w-screen flex flex-col gap-6 items-center justify-center p-4'>
            <div className='flex flex-col items-center justify-center text-center gap-1'>
                <h1 className='font-bold text-4xl tablet:text-6xl laptop:text-7xl'>Calcugrade</h1>
                <p className='text-base px-1 tablet:text-lg laptop:text-xl'>
                    Grades are hard. Make it easier by monitoring your courses real time, for free.
                </p>
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
                <button className={loginClassNames.join(' ')} onClick={() => handleLoginClick()}>
                    Log in
                </button>
                <button className={signupClassNames.join(' ')} onClick={() => handleSignupClick()}>
                    Sign Up
                </button>
            </div>
        </div>
    )
}

export default Home
