import React, { useEffect, useState } from 'react'

const _MS_PER_DAY = 1000 * 60 * 60 * 24

const UpcomingTask: React.FC<{
    assignmentName: string
    courseCode: string
    dueDate: Date
    percentOfFinal: number
}> = ({ assignmentName, courseCode, dueDate, percentOfFinal }) => {
    const [dueIn, setDueIn] = useState<number>(0)

    useEffect(() => {
        async function getDueIn() {
            const today = new Date()

            const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
            const utc2 = Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())

            setDueIn(Math.floor((utc2 - utc1) / _MS_PER_DAY))
        }
        getDueIn()
    })

    return (
        <div className='w-full'>
            <p>{assignmentName}</p>
            <p>{courseCode}</p>
            <p>{dueIn}</p>
            <p>{percentOfFinal}</p>
        </div>
    )
}

export default UpcomingTask
