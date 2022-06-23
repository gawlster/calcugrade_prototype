import axios from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { User, defaultUser } from '../../Types'
import { Logout } from '../../hooks/Logout'
import GithubLink from '../../components/GithubLink'

const Dashboard: NextPage = () => {
    const [creatingCourse, setCreatingCourse] = useState<boolean>(false)

    const [loadingPage, setLoadingPage] = useState<boolean>(true)

    const [userInfo, setUserInfo] = useState<User>(defaultUser)

    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                const curUserInfo = await axios.post('/api/GetCurrentUserInfo', { uid: curUserID })
                setUserInfo(curUserInfo.data)
            } else {
                window.location.pathname = '/auth/login'
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
                    {creatingCourse ? (
                        <CreateCourseForm _close={(v) => setCreatingCourse(false)} />
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
                                    <div className='w-full h-full border-2 border-slate-500'></div>
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

const CreateCourseForm: React.FC<{ _close: (val: boolean) => void }> = ({ _close }) => {
    const [userID, setUserID] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const [confirmCancel, setConfirmCancel] = useState<boolean>(false)

    const [school, setSchool] = useState<string>('')
    const [courseCode, setCourseCode] = useState<string>('')
    const [courseName, setCourseName] = useState<string>('')

    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                setUserID(curUserID)
            }
        }
        getData()
    })

    function cancelCreateCourse() {
        setSchool('')

        _close(false)
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        // need to send the data to the db
        const toSend = {
            userID: userID,
            school: school,
            courseCode: courseCode,
            courseName: courseName,
            earnedGrade: 0,
            expectedGrade: 0,
            onTrackGrade: 0,
            assignments: [],
        }
        const res = await axios.post('/api/PostNewCourse', toSend)
        console.log(res)
    }

    const labelStyles = 'flex flex-row gap-2'
    const inputStyles =
        'transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'

    return (
        <div className='w-screen h-screen flex flex-col gap-3 text-lg items-center justify-center'>
            <div className='text-xl font-semibold'>Add a course</div>
            <div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    action='#'
                    className='flex flex-col gap-2 border p-8 w-fit'>
                    <label className={labelStyles}>
                        School:
                        <input
                            className={inputStyles}
                            placeholder='ie. UVic'
                            type='text'
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </label>
                    <label className={labelStyles}>
                        Course Code:
                        <input
                            className={inputStyles}
                            placeholder='ie. CSC 225'
                            type='text'
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                        />
                    </label>
                    <label className={labelStyles}>
                        Course Name (optional):
                        <input
                            className={inputStyles}
                            placeholder='ie. Algorthms and Data Structures I'
                            type='text'
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            size={40}
                        />
                    </label>
                    <div className='flex flex-row gap-2'>
                        <button
                            className='rounded transition-colors border-2 border-orange-600 text-orange-600 px-2 py-1 font-bold hover:border-transparent hover:text-white hover:bg-orange-600'
                            type='submit'>
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                        <button onClick={() => setConfirmCancel(true)}>Cancel</button>
                    </div>
                </form>
            </div>
            {confirmCancel && (
                <div className='p-8 w-1/3 bg-gray-200 absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex flex-col gap-2 items-center'>
                    <h1>Are you sure you want to cancel? All progress will be lost.</h1>
                    <div className='flex flex-row gap-2'>
                        <button
                            onClick={() => {
                                setConfirmCancel(false)
                                cancelCreateCourse()
                            }}
                            className='transition-colors text-green-600 font-bold border border-green-600 px-2 hover:border-transparent hover:text-white hover:bg-green-600'>
                            Yes, cancel
                        </button>
                        <button onClick={() => setConfirmCancel(false)} className='text-red-500'>
                            No, keep working
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
