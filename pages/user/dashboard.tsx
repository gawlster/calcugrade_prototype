import axios from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { UserType, defaultUser, AssignmentType, TaskType } from '../../Types'
import GithubLink from '../../components/GithubLink'
import UserIcon from '../../components/UserIcon'
import { useRouter } from 'next/router'
import LoadingPage from '../../components/LoadingPage'
import CurrentCourses from '../../components/CurrentCourses'
import { ReloadContext } from '../../context/ReloadContext'
import UpcomingAssignments from '../../components/UpcomingAssignments'

const Dashboard: NextPage = () => {
    const router = useRouter()

    const [reload, setReload] = useState(true)
    const [smallScreen, setSmallScreen] = useState(false)
    const [midSmall, setMidSmall] = useState(false)
    const [xsScreen, setXSScreen] = useState(false)

    const [showingCurrentCourses, setShowingCurrentCourses] = useState(true)

    const [loadingPage, setLoadingPage] = useState<boolean>(true)
    const [userInfo, setUserInfo] = useState<UserType>(defaultUser)

    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                await axios.post('/api/UpdateGrades', { uid: curUserID })
                const curUserInfo = await axios.post('/api/GetCurrentUserInfo', { uid: curUserID })
                setUserInfo(curUserInfo.data)
                const getScreenSize = () => {
                    // get screen size
                    const screenSize = window.innerWidth
                    if (screenSize <= 850) {
                        setSmallScreen(true)
                        if (screenSize <= 500) {
                            setMidSmall(true)
                            if (screenSize < 360) {
                                setXSScreen(true)
                            } else {
                                setXSScreen(false)
                            }
                        } else {
                            setMidSmall(false)
                        }
                    } else {
                        setSmallScreen(false)
                        setMidSmall(false)
                        setXSScreen(false)
                    }
                }
                getScreenSize()
                window.addEventListener('resize', getScreenSize)
            } else {
                router.push('/auth/login')
            }
            setLoadingPage(false)
        }
        getData()
    }, [reload])

    return (
        <div>
            {loadingPage ? (
                <LoadingPage />
            ) : (
                <ReloadContext.Provider value={{ reload, setReload }}>
                    {xsScreen ? (
                        <div>
                            Sorry, your screen is too small. Support for this size device is coming
                            soon.
                        </div>
                    ) : (
                        <div className='flex flex-col gap-2 h-screen p-4'>
                            <div className='w-full h-full'>
                                <div className='text-2xl flex flex-row justify-between items-center p-2'>
                                    <div className='pr-10'>
                                        Welcome back,{' '}
                                        <div className='inline font-bold text-mid'>
                                            {userInfo.fname}
                                        </div>
                                    </div>
                                    <UserIcon
                                        finitial={userInfo.fname[0]}
                                        linitial={userInfo.lname[0]}
                                    />
                                </div>
                                {smallScreen ? (
                                    <>
                                        <div
                                            className={`flex flex-row justify-between ${
                                                !xsScreen ? 'mt-4' : '-mt-3'
                                            } px-3 text-center`}>
                                            <div
                                                onClick={() => setShowingCurrentCourses(false)}
                                                className={`${
                                                    showingCurrentCourses
                                                        ? 'font-light text-black cursor-pointer'
                                                        : 'font-bold text-dark'
                                                }`}>
                                                {showingCurrentCourses
                                                    ? 'View upcoming tasks'
                                                    : 'Upcoming tasks:'}
                                            </div>
                                            <div
                                                onClick={() => setShowingCurrentCourses(true)}
                                                className={`${
                                                    showingCurrentCourses
                                                        ? 'font-bold text-dark'
                                                        : 'font-light text-black cursor-pointer'
                                                }`}>
                                                {showingCurrentCourses
                                                    ? 'Current courses:'
                                                    : 'View current courses'}
                                            </div>
                                        </div>
                                        <div className='border border-dark rounded w-full h-4/5 p-3'>
                                            {showingCurrentCourses ? (
                                                <>
                                                    <CurrentCourses
                                                        small={midSmall}
                                                        userInfo={userInfo}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <UpcomingAssignments
                                                        small={midSmall}
                                                        userInfo={userInfo}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='flex flex-row gap-2 w-full h-4/5'>
                                            <div className='flex flex-col gap-1 w-1/3'>
                                                <h1 className='text-lg'>Upcoming tasks:</h1>
                                                <div className='w-full h-full border-2 border-dark p-4 flex flex-col gap-4 overflow-auto'>
                                                    <UpcomingAssignments
                                                        small={false}
                                                        userInfo={userInfo}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-1 w-2/3'>
                                                <h1 className='text-lg'>Current courses:</h1>
                                                <div className='w-full h-full border-2 border-dark p-4 flex flex-col gap-4 overflow-auto'>
                                                    <CurrentCourses
                                                        small={false}
                                                        userInfo={userInfo}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </ReloadContext.Provider>
            )}
            <GithubLink />
        </div>
    )
}

export default Dashboard
