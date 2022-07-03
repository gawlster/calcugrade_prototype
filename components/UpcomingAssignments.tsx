import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TaskType, UserType } from '../Types'
import Task from './Task'

const UpcomingAssignments: React.FC<{ userInfo: UserType }> = ({ userInfo }) => {
    const [upcomingAssignments, setUpcomingAssignments] = useState<any[]>([])
    const [sortMethod, setSortMethod] = useState('')

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.post('/api/GetUpcomingTasks', { uid: userInfo._id })
                setUpcomingAssignments(res.data.tasks)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [sortMethod])

    return (
        <div className='w-full overflow-x-hidden flex flex-col gap-2'>
            {upcomingAssignments.map((task: TaskType) => {
                return <Task key={task._id} taskInfo={task} />
            })}
        </div>
    )
}

export default UpcomingAssignments
