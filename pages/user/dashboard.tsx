import axios from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { UserType, defaultUser } from '../../Types'
import GithubLink from '../../components/GithubLink'
import Course from '../../components/Course'
import UserIcon from '../../components/UserIcon'
import CreateCourseForm from '../../components/CreateCourseForm'

const Dashboard: NextPage = () => {
    const [creatingCourse, setCreatingCourse] = useState<boolean>(false)
    const [updated, setUpdated] = useState<boolean>(false)

    const [loadingPage, setLoadingPage] = useState<boolean>(true)

    const [userInfo, setUserInfo] = useState<UserType>(defaultUser)

    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                await axios.post('/api/UpdateGrades', { uid: curUserID })
                const curUserInfo = await axios.post('/api/GetCurrentUserInfo', { uid: curUserID })
                setUserInfo(curUserInfo.data)
            } else {
                window.location.pathname = '/auth/login'
            }
            setLoadingPage(false)
        }
        getData()
    }, [updated, creatingCourse])

    return (
        <div>
            {loadingPage ? (
                <div>Loading...</div>
            ) : (
                <div className='flex flex-col gap-2 h-screen p-4'>
                    {creatingCourse ? (
                        <CreateCourseForm _close={() => setCreatingCourse(false)} />
                    ) : (
                        <div className='w-full h-full'>
                            <div className='text-2xl flex flex-row justify-between items-center p-2'>
                                <div>
                                    Welcome back,{' '}
                                    <div className='inline font-bold'>{userInfo.fname}</div>
                                </div>
                                <UserIcon
                                    finitial={userInfo.fname[0]}
                                    linitial={userInfo.lname[0]}
                                />
                            </div>
                            <div className='flex flex-row gap-2 w-full h-4/5'>
                                <div className='flex flex-col gap-1 w-1/3'>
                                    <h1 className='text-lg'>Upcoming tasks:</h1>
                                    <div className='w-full h-full border-2 border-slate-500'></div>
                                </div>
                                <div className='flex flex-col gap-1 w-2/3'>
                                    <h1 className='text-lg'>Current courses:</h1>
                                    <div className='w-full h-full border-2 border-slate-500 p-4 flex flex-col gap-4'>
                                        {userInfo.courses.map((course) => {
                                            return (
                                                <Course
                                                    key={course._id}
                                                    courseID={course._id}
                                                    courseCode={course.courseCode}
                                                    earnedGrade={course.earnedGrade}
                                                    estimatedGrade={course.expectedGrade}
                                                    onTrackGrade={course.onTrackGrade}
                                                    assignments={course.assignments}
                                                    _update={() => setUpdated(true)}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div
                                className='text-center cursor-pointer mt-2'
                                onClick={() => setCreatingCourse(true)}>
                                Add a course
                            </div>
                        </div>
                    )}
                </div>
            )}
            <GithubLink />
        </div>
    )
}

export default Dashboard
