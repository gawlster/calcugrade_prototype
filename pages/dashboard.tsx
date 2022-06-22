import axios from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { User, defaultUser } from '../Types'
import { Logout } from '../hooks/Logout'
import GithubLink from '../components/GithubLink'

const Dashboard: NextPage = () => {
    const [loadingPage, setLoadingPage] = useState<boolean>(true)

    const [userInfo, setUserInfo] = useState<User>(defaultUser)

    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                const curUserInfo = await axios.post('/api/GetCurrentUserInfo', { uid: curUserID })
                setUserInfo(curUserInfo.data)
            } else {
                window.location.pathname = '/login'
            }
            setLoadingPage(false)
        }
        getData()
    }, [])

    return (
        <div>
            {loadingPage ? (
                <div>Loading...</div>
            ) : (
                <div className='flex flex-col gap-2 h-screen p-4'>
                    <div className='text-2xl flex flex-row justify-between items-center p-2'>
                        <div>
                            Welcome back, <div className='inline font-bold'>{userInfo.fname}</div>
                        </div>
                        <UserIcon finitial={userInfo.fname[0]} linitial={userInfo.lname[0]} />
                    </div>
                    <div className='flex flex-row gap-2 w-full h-4/5'>
                        <div className='flex flex-col gap-1 w-1/3'>
                            <h1 className='text-lg'>Upcoming tasks:</h1>
                            <div className='w-full h-full border-2 border-slate-500'></div>
                        </div>
                        <div className='flex flex-col gap-1 w-2/3'>
                            <h1 className='text-lg'>Current courses:</h1>
                            <div className='w-full h-full border-2 border-slate-500'></div>
                        </div>
                    </div>
                </div>
            )}
            <GithubLink />
        </div>
    )
}

const UserIcon: React.FC<{ finitial: string; linitial: string }> = ({ finitial, linitial }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [showConfirmLogout, setShowConfirmLogout] = useState<boolean>(false)

    return (
        <div>
            <div
                onClick={() => setOpen(!open)}
                className='uppercase select-none cursor-pointer w-10 h-10 rounded-full border-2 border-black flex justify-center items-center text-center font-bold'>
                {finitial}
                {linitial}
            </div>
            {open && (
                <div className='rounded absolute w-1/6 h-fit right-10 px-4 py-6 bg-gray-400 flex flex-col gap-1 items-center'>
                    <a
                        className='transition-all hover:text-orange-800 hover:font-bold'
                        href='/profile'>
                        My Profile
                    </a>
                    <a
                        className='transition-all hover:text-orange-800 hover:font-bold'
                        href='/preferences'>
                        Preferences
                    </a>
                    <a
                        className='transition-all hover:text-orange-800 hover:font-bold'
                        href='/other'>
                        Other
                    </a>
                    <a
                        className='transition-all hover:text-orange-800 hover:font-bold'
                        href='#'
                        onClick={() => {
                            setShowConfirmLogout(true)
                            setOpen(false)
                        }}>
                        Logout
                    </a>
                </div>
            )}
            {showConfirmLogout && (
                <div className='p-8 w-1/3 bg-gray-200 absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex flex-col gap-2 items-center'>
                    <h1>Are you sure you want to log out?</h1>
                    <div className='flex flex-row gap-2'>
                        <button
                            onClick={() => Logout()}
                            className='transition-colors text-green-600 font-bold border border-green-600 px-2 hover:border-transparent hover:text-white hover:bg-green-600'>
                            Confirm
                        </button>
                        <button
                            onClick={() => setShowConfirmLogout(false)}
                            className='text-red-500'>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
