import React from 'react'

const Task: React.FC<{
    taskID: string
    name: string
    courseCode: string
    daysToDue: number
    type: 'due' | 'overdue'
    percentageOfFinal: number
}> = ({ taskID, name, courseCode, daysToDue, type, percentageOfFinal }) => {
    return (
        <div className='w-full h-fit max-h-[18rem] overflow-auto px-4 py-2 border flex flex-row justify-between items-center'>
            <div>
                <div className='text-xl font-bold'>{name}</div>
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
