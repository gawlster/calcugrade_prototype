import { faEllipsis, faTrashCan, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AssignmentType } from '../Types'
import Assignment from './Assignment'
import CreateAssignmentForm from './CreateAssignmentForm'

const Course: React.FC<{
    courseID: string
    courseCode: string
    earnedGrade: string
    estimatedGrade: string
    onTrackGrade: string
    assignments: AssignmentType[]
    _update: () => void
}> = ({
    courseID,
    courseCode,
    earnedGrade,
    estimatedGrade,
    onTrackGrade,
    assignments,
    _update,
}) => {
    const [loadDelete, setLoadDelete] = useState(false)
    const [userID, setUserID] = useState('')

    const [confirmDeleteCourse, setConfirmDeleteCourse] = useState(false)

    const [open, setOpen] = useState<boolean>(false)
    const [creatingAssignment, setCreatingAssignment] = useState<boolean>(false)

    const gradeCardStyles = 'flex flex-col items-center justify-center border p-1'

    useEffect(() => {
        async function getData() {
            const uid = localStorage.getItem('curUserID')
            if (uid) {
                setUserID(uid)
            } else {
                window.location.pathname = '/auth/login'
            }
        }
        getData()
    }, [])

    async function handleDeleteCourse() {
        setLoadDelete(true)

        await axios.post('/api/DeleteCourse', { userID: userID, courseID: courseID })

        setLoadDelete(false)
        _update()
    }

    async function showConfirmDelete() {
        setConfirmDeleteCourse(true)
        setOpen(true)
    }

    return (
        <div>
            {creatingAssignment ? (
                <CreateAssignmentForm
                    cid={courseID}
                    _close={() => setCreatingAssignment(false)}
                    _update={() => _update()}
                />
            ) : (
                <div className='w-full h-fit max-h-[30rem] overflow-auto px-4 py-2 border flex flex-col gap-1'>
                    <div
                        className='flex flex-row justify-between items-center cursor-pointer'
                        onClick={() => setOpen(!open)}>
                        {confirmDeleteCourse && (
                            <div className='absolute z-10 inset-0 bg-gray-600 bg-opacity-40'>
                                <div className='absolute z-20 right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 border p-4 flex flex-col gap-3 bg-white w-80 items-center font-bold text-xl'>
                                    Confirm delete course?
                                    <div className='flex flex-row gap-2'>
                                        <button
                                            onClick={() => handleDeleteCourse()}
                                            className='text-lg transition-colors text-green-600 font-bold border border-green-600 px-2 hover:border-transparent hover:text-white hover:bg-green-600'>
                                            {loadDelete ? 'Loading...' : 'Yes, delete.'}
                                        </button>
                                        <button
                                            className='text-lg text-red-500 font-normal'
                                            onClick={() => setConfirmDeleteCourse(false)}>
                                            No, keep it
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='flex flex-row items-center gap-3'>
                            <div className='text-xl font-bold'>{courseCode}</div>
                            {open && (
                                <div>
                                    {loadDelete ? (
                                        <div>
                                            <FontAwesomeIcon icon={faEllipsis} />
                                        </div>
                                    ) : (
                                        <div
                                            className='change-on-hover'
                                            onClick={() => {
                                                showConfirmDelete()
                                            }}>
                                            <div>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </div>
                                            <div>
                                                <FontAwesomeIcon icon={faTrashCanArrowUp} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <div className={gradeCardStyles}>
                                <div className='text-lg font-semibold'>
                                    {Math.round(Number(earnedGrade) * 10) / 10}%
                                </div>
                                <div className='text-sm italic text-center'>EARNED</div>
                            </div>
                            <div className={gradeCardStyles}>
                                <div className='text-lg font-semibold'>
                                    {Math.round(Number(estimatedGrade) * 10) / 10}%
                                </div>
                                <div className='text-sm italic text-center'>ESTIMATED</div>
                            </div>
                            <div className={gradeCardStyles}>
                                <div className='text-lg font-semibold'>
                                    {Math.round(Number(onTrackGrade) * 10) / 10}%
                                </div>
                                <div className='text-sm italic text-center'>ON TRACK</div>
                            </div>
                        </div>
                    </div>
                    {open && (
                        <div className='p-2'>
                            {assignments.length === 0 ? (
                                <div className='text-center'>
                                    No assignments to show.{' '}
                                    <div
                                        className='inline cursor-pointer'
                                        onClick={() => setCreatingAssignment(true)}>
                                        Add some now?
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-5'>
                                    {assignments.map((assignment) => {
                                        return (
                                            <Assignment
                                                key={assignment._id}
                                                assignment={assignment}
                                                courseID={courseID}
                                                _update={() => _update()}
                                            />
                                        )
                                    })}
                                    <div
                                        className='text-center cursor-pointer'
                                        onClick={() => setCreatingAssignment(true)}>
                                        Add an assignment
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Course
