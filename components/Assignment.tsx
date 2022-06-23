import { AssignmentType } from '../Types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Assignment: React.FC<{ assignment: AssignmentType }> = ({ assignment }) => {
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

    return (
        <div className='flex flex-col gap-2 border-2 rounded p-3'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    {assignment.assignmentName}:{' '}
                    {assignment.status !== 'todo'
                        ? `${assignment.status}`
                        : `Due ${formatDate(assignment.dueDate)}`}
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <FontAwesomeIcon className='cursor-pointer' icon={faPenToSquare} />
                    <FontAwesomeIcon className='cursor-pointer' icon={faTrashCan} />
                </div>
            </div>
            <div className='flex flex-row justify-around'>
                <div>Worth {assignment.percentageOfFinal}%</div>
                <div>
                    {assignment.status === 'graded'
                        ? `Got ${Math.round(assignment.grade * 10) / 10}%`
                        : assignment.status === 'submitted'
                        ? `Expected ${Math.round(assignment.grade * 10) / 10}%`
                        : ''}
                </div>
                <div>
                    {assignment.status === 'graded'
                        ? `Earned ${Math.round(assignment.earnedOfFinal * 10) / 10}% of final grade`
                        : assignment.status === 'submitted'
                        ? `Expected ${
                              Math.round(assignment.earnedOfFinal * 10) / 10
                          }% of final grade`
                        : ''}
                </div>
            </div>
        </div>
    )
}

export default Assignment
