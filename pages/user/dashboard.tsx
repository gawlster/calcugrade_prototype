import axios from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { UserType, defaultUser, AssignmentType, TaskType } from '../../Types'
import GithubLink from '../../components/GithubLink'
import Course from '../../old-components/Course'
import UserIcon from '../../components/UserIcon'
import CreateCourseForm from '../../old-components/CreateCourseForm'
import Task from '../../old-components/Task'
import { useRouter } from 'next/router'
import LoadingPage from '../../components/LoadingPage'

const Dashboard: NextPage = () => {
    const router = useRouter()

    const [loadingPage, setLoadingPage] = useState<boolean>(true)
    const [updated, setUpdated] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserType>(defaultUser)

    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                await axios.post('/api/UpdateGrades', { uid: curUserID })
                const curUserInfo = await axios.post('/api/GetCurrentUserInfo', { uid: curUserID })
                setUserInfo(curUserInfo.data)
            } else {
                router.push('/auth/login')
            }
            setLoadingPage(false)
        }
        getData()
    }, [updated])

    return (
        <div>
            {loadingPage ? (
                <LoadingPage />
            ) : (
                <div className='flex flex-col gap-2 h-screen p-4'>
                    <div className='w-full h-full'>
                        <div className='text-2xl flex flex-row justify-between items-center p-2'>
                            <div>
                                Welcome back,{' '}
                                <div className='inline font-bold text-mid'>{userInfo.fname}</div>
                            </div>
                            <UserIcon finitial={userInfo.fname[0]} linitial={userInfo.lname[0]} />
                        </div>
                        <div className='flex flex-row gap-2 w-full h-4/5'>
                            <div className='flex flex-col gap-1 w-1/3'>
                                <h1 className='text-lg'>Upcoming tasks:</h1>
                                <div className='w-full h-full border-2 border-slate-500 p-4 flex flex-col gap-4 overflow-auto'>
                                    {/* <TasksSection userInfo={userInfo} /> */}
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 w-2/3'>
                                <h1 className='text-lg'>Current courses:</h1>
                                <div className='w-full h-full border-2 border-slate-500 p-4 flex flex-col gap-4 overflow-auto'>
                                    {/* <CoursesSection userInfo={userInfo} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <GithubLink />
        </div>
    )
}

export default Dashboard
