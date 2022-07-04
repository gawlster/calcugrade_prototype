import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { ReloadContext } from '../context/ReloadContext'
import parseDate from '../hooks/ParseDate'
import { AssignmentType, CourseType, UserType } from '../Types'
import Confirm from './Confirm'

const Assignment: React.FC<{
    userInfo: UserType
    courseInfo: CourseType
    assignmentInfo: AssignmentType
}> = ({ userInfo, courseInfo, assignmentInfo }) => {
    const router = useRouter()

    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const { reload, setReload } = useContext(ReloadContext)

    function formatDate(date: Date) {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        let datestr = date.toString()
        datestr = datestr.split('T')[0]
        const [year, month, day] = datestr.split('-')
        let toReturn = `${months[Number(month) - 1]} ${day}, ${year}`
        return toReturn
    }
    function isOverdue(dueDate: Date) {
        const today = new Date()
        const due = parseDate(dueDate)
        if (due.getTime() - today.getTime() < 0) {
            return true
        }
        return false
    }

    async function handleDelete() {
        setLoadingDelete(true)
        try {
            await axios.post('/api/DeleteAssignment', {
                userID: userInfo._id,
                courseID: courseInfo._id,
                assignmentID: assignmentInfo._id,
            })
            setReload(!reload)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='w-full border border-dark p-3'>
            {showConfirmDelete && (
                <Confirm
                    message='Are you sure you want to delete this assignment?'
                    confirm={() => handleDelete()}
                    confirmMSG={loadingDelete ? 'Loading...' : 'Yes, delete the assignment'}
                    cancel={() => setShowConfirmDelete(false)}
                    cancelMSG='No, keep the assignment'
                />
            )}
            <div className='flex flex-row justify-between'>
                <div>
                    {assignmentInfo.assignmentName}:{' '}
                    <div
                        className={`inline ${
                            assignmentInfo.status === 'todo' &&
                            isOverdue(assignmentInfo.dueDate) &&
                            'text-red-500'
                        }`}>
                        {assignmentInfo.status !== 'todo'
                            ? assignmentInfo.status === 'graded'
                                ? 'Graded'
                                : 'Submitted'
                            : `Due ${formatDate(assignmentInfo.dueDate)}`}
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <FontAwesomeIcon
                        onClick={() =>
                            router.push(
                                `/user/assignment/${userInfo._id}/${courseInfo._id}/${assignmentInfo._id}`
                            )
                        }
                        className='cursor-pointer'
                        icon={faPenToSquare}
                    />
                    <FontAwesomeIcon
                        className='cursor-pointer'
                        icon={faTrashCan}
                        onClick={() => setShowConfirmDelete(true)}
                    />
                </div>
            </div>
            <div className='flex flex-row justify-around'>
                <div>Worth {assignmentInfo.percentageOfFinal}%</div>
                {assignmentInfo.status !== 'todo' && (
                    <>
                        <div>|</div>
                        <div>
                            {assignmentInfo.status === 'submitted' ? 'Expected' : 'Got'}{' '}
                            {assignmentInfo.grade}%
                        </div>
                        <div>|</div>
                        <div>
                            {assignmentInfo.status === 'submitted' ? 'Expect' : 'Earned'}{' '}
                            {assignmentInfo.earnedOfFinal}% of final grade
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Assignment
