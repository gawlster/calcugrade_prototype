import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ReloadContext } from '../context/ReloadContext'
import { TaskType, UserType } from '../Types'
import LoadingComp from './LoadingComp'
import Task from './Task'

const UpcomingAssignments: React.FC<{ userInfo: UserType }> = ({ userInfo }) => {
    const [loadingComp, setLoadingComp] = useState(true)

    const { reload, setReload } = useContext(ReloadContext)

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
            setLoadingComp(false)
        }
        getData()
    }, [sortMethod, reload])

    return (
        <div
            className={`w-full overflow-x-hidden flex flex-col gap-2 ${
                loadingComp ? 'h-full justify-center items-center' : ''
            }`}>
            {loadingComp ? (
                <LoadingComp />
            ) : (
                <>
                    {upcomingAssignments.map((task: TaskType) => {
                        return <Task userID={userInfo._id} key={task._id} taskInfo={task} />
                    })}
                </>
            )}
        </div>
    )
}

export default UpcomingAssignments
