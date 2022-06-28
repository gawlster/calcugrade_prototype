import { AssignmentType } from '../Types'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import CreateAssignmentForm from './CreateAssignmentForm'
import parseDate from '../hooks/ParseDate'

const Assignment: React.FC<{
    assignment: AssignmentType
    courseID: string
    _update: () => void
}> = ({ assignment, courseID, _update }) => {
    const [updatingGrade, setUpdatingGrade] = useState(false)

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

    function isOverdue() {
        const today = new Date()
        const due = parseDate(assignment.dueDate)
        if (due.getTime() - today.getTime() < 0) {
            return true
        }
        return false
    }

    return (
        <div className='flex flex-col gap-2 border-2 rounded p-3'>
            {updatingGrade ? (
                <div>
                    <CreateAssignmentForm
                        cid={courseID}
                        _close={() => setUpdatingGrade(false)}
                        _update={() => _update()}
                        prevData={{
                            taskID: assignment._id,
                            courseID: courseID,
                            taskName: assignment.assignmentName,
                        }}
                    />
                </div>
            ) : (
                <div>
                    <div className='flex flex-row justify-between items-center'>
                        <div>
                            {assignment.assignmentName}:{' '}
                            <div
                                className={`inline ${
                                    assignment.status === 'todo' &&
                                    isOverdue() &&
                                    'text-red-500 font-bold'
                                }`}>
                                {assignment.status !== 'todo'
                                    ? `${assignment.status}`
                                    : `Due ${formatDate(assignment.dueDate)}`}
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <FontAwesomeIcon
                                className='cursor-pointer'
                                icon={faPenToSquare}
                                onClick={() => setUpdatingGrade(true)}
                            />
                            <FontAwesomeIcon className='cursor-pointer' icon={faTrashCan} />
                        </div>
                    </div>
                    <div
                        className={`flex flex-row ${
                            assignment.status !== 'todo' ? 'justify-around' : 'justify-center'
                        }`}>
                        <div>Worth {assignment.percentageOfFinal}%</div>
                        {assignment.status !== 'todo' && <div>|</div>}
                        <div>
                            {assignment.status === 'graded'
                                ? `Got ${Math.round(assignment.grade * 10) / 10}%`
                                : assignment.status === 'submitted'
                                ? `Expected ${Math.round(assignment.grade * 10) / 10}%`
                                : ''}
                        </div>
                        {assignment.status !== 'todo' && <div>|</div>}
                        <div>
                            {assignment.status === 'graded'
                                ? `Earned ${
                                      Math.round(assignment.earnedOfFinal * 10) / 10
                                  }% of final grade`
                                : assignment.status === 'submitted'
                                ? `Expected ${
                                      Math.round(assignment.earnedOfFinal * 10) / 10
                                  }% of final grade`
                                : ''}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Assignment
