import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CreateCourseForm: React.FC<{ _close: () => void }> = ({ _close }) => {
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
        setCourseCode('')
        setCourseName('')

        _close()
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)
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
        await axios.post('/api/PostNewCourse', toSend)
        setLoading(false)
        _close()
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

export default CreateCourseForm
