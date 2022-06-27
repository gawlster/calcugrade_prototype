import { faCheck, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import UpdateGrades from './UpdateGrades'

const Task: React.FC<{
    taskID: string
    courseID: string
    name: string
    courseCode: string
    daysToDue: number
    type: 'due' | 'overdue'
    percentageOfFinal: number
}> = ({ taskID, courseID, name, courseCode, daysToDue, type, percentageOfFinal }) => {
    const [updatingGrades, setUpdatingGrades] = useState(false)

    function handleCheckoff() {
        setUpdatingGrades(true)
    }

    return (
        <div className='w-full h-fit max-h-[18rem] overflow-auto px-4 py-2 border flex flex-row justify-between items-center'>
            {updatingGrades && <UpdateGrades taskID={taskID} courseID={courseID} taskName={name} />}
            <div>
                <div className='flex items-center gap-2'>
                    <div className='text-xl font-bold'>{name}</div>
                    <div
                        className='cursor-pointer change-on-hover'
                        onClick={() => handleCheckoff()}>
                        <div>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSquareCheck} />
                        </div>
                    </div>
                </div>
                <div>
                    {courseCode} |{' '}
                    <div className={`inline font-semibold ${type === 'overdue' && 'text-red-500'}`}>
                        {type === 'due'
                            ? `Due in ${daysToDue} ${daysToDue === 1 ? 'day' : 'days'}`
                            : `Overdue by ${daysToDue} ${daysToDue === 1 ? 'day' : 'days'}`}
                    </div>
                </div>
            </div>
            <div className='text-lg'>{percentageOfFinal}%</div>
        </div>
    )
}

export default Task
