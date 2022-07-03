import React from 'react'
import { TaskType } from '../Types'

const Task: React.FC<{ taskInfo: TaskType }> = ({ taskInfo }) => {
    return (
        <div className='flex flex-row justify-between border border-dark px-3 py-1 items-center'>
            <div>
                <div className='text-lg font-bold text-dark'>{taskInfo.assignmentName}</div>
                <div className='text-sm'>
                    {taskInfo.courseCode} |{' '}
                    <div
                        className={`inline font-semibold ${
                            taskInfo.type === 'overdue' ? 'text-red-500' : ''
                        } : ''`}>
                        {taskInfo.type === 'due'
                            ? `Due in ${taskInfo.daysToDue} ${
                                  taskInfo.daysToDue === 1 ? 'day' : 'days'
                              }`
                            : `Overdue by ${taskInfo.daysToDue} ${
                                  taskInfo.daysToDue === 1 ? 'day' : 'days'
                              }`}
                    </div>
                </div>
            </div>
            <div className='text-dark text-lg'>{taskInfo.percentageOfFinal}%</div>
        </div>
    )
}

export default Task
