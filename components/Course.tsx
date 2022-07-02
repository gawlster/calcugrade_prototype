import { faArrowDownShortWide, faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { ReloadContext } from '../context/ReloadContext'
import { AssignmentType, CourseType, UserType } from '../Types'
import Assignment from './Assignment'
import Confirm from './Confirm'
import Grade from './Grade'

const Course: React.FC<{ userInfo: UserType; courseInfo: CourseType }> = ({
    userInfo,
    courseInfo,
}) => {
    const { reload, setReload } = useContext(ReloadContext)

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    async function handleDelete() {
        setLoadingDelete(true)
        await axios.post('/api/DeleteCourse', {
            userID: userInfo._id,
            courseID: courseInfo._id,
        })
        setShowConfirmDelete(false)
        console.log(reload)
        setReload(!reload)
        console.log(reload)
        setLoadingDelete(false)
    }

    return (
        <div className={`w-full h-fit px-6 py-4 border-2 border-dark flex flex-col gap-4`}>
            {showConfirmDelete && (
                <Confirm
                    message='Are you sure you want to delete this course?'
                    confirm={() => handleDelete()}
                    confirmMSG={loadingDelete ? 'Loading...' : 'Yes, delete the course'}
                    cancel={() => setShowConfirmDelete(false)}
                    cancelMSG='No, keep the course'
                />
            )}
            <div className='flex flex-row justify-between items-center'>
                <div className='font-bold text-dark text-xl'>{courseInfo.courseCode}</div>
                {!open ? (
                    <FontAwesomeIcon
                        className='cursor-pointer'
                        onClick={() => setOpen(true)}
                        icon={faArrowDownShortWide}
                    />
                ) : (
                    <FontAwesomeIcon
                        className='cursor-pointer'
                        onClick={() => setOpen(false)}
                        icon={faArrowUpShortWide}
                    />
                )}

                <div className='flex flex-row gap-2 text-center'>
                    <Grade grade={Number(courseInfo.earnedGrade)} type='EARNED' />
                    <Grade grade={Number(courseInfo.expectedGrade)} type='EXPECTED' />
                    <Grade grade={Number(courseInfo.onTrackGrade)} type='ON TRACK' />
                </div>
            </div>
            {open && (
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-3 max-h-80 overflow-auto'>
                        {courseInfo.assignments.map((assignment: AssignmentType) => {
                            return (
                                <Assignment
                                    userInfo={userInfo}
                                    courseInfo={courseInfo}
                                    assignmentInfo={assignment}
                                />
                            )
                        })}
                    </div>
                    {courseInfo.assignments.length === 0 ? (
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <div>No assignments yet.</div>
                            <div className='flex flex-row gap-2 justify-center items-center text-center'>
                                <div
                                    onClick={() =>
                                        router.push(
                                            `/user/assignment/${userInfo._id}/${courseInfo._id}`
                                        )
                                    }
                                    className='cursor-pointer font-semibold text-mid'>
                                    Add an assignment
                                </div>
                                <div
                                    onClick={() => setShowConfirmDelete(true)}
                                    className='cursor-pointer'>
                                    Delete this course
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-row gap-2 justify-center items-center text-center'>
                            <div
                                onClick={() =>
                                    router.push(
                                        `/user/assignment/${userInfo._id}/${courseInfo._id}`
                                    )
                                }
                                className='cursor-pointer font-semibold text-mid'>
                                Add an assignment
                            </div>
                            <div
                                onClick={() => setShowConfirmDelete(true)}
                                className='cursor-pointer'>
                                Delete this course
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Course
