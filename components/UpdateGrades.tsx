import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { defaultTask, TaskType } from '../Types'
import DatePicker from 'react-datepicker'
import parseDate from '../hooks/ParseDate'

const UpdateGrades: React.FC<{ taskID: string; taskName: string; courseID: string }> = ({
    taskID,
    taskName,
    courseID,
}) => {
    const [loading, setLoading] = useState(true)
    const [assignmentDetails, setAssignmentDetails] = useState<TaskType>(defaultTask)
    const [confirmCancel, setConfirmCancel] = useState(false)

    const [percentageOfFinalErr, setPercentageOfFinalErr] = useState(false)
    const [gradeErr, setGradeErr] = useState(false)

    const [assignmentName, setAssignmentName] = useState<string>('')
    const [dueDate, setDueDate] = useState<Date>(() => new Date())
    const [grade, setGrade] = useState<number>(0)
    const [percentageOfFinal, setPercentageOfFinal] = useState<number>(0)
    const [status, setStatus] = useState<'todo' | 'submitted' | 'graded'>('todo')

    useEffect(() => {
        async function getData() {
            // get assignment details here
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                const res = await axios.post('/api/GetAssignmentDetails', {
                    uid: curUserID,
                    cid: courseID,
                    aid: taskID,
                })
                setAssignmentName(res.data.assignmentName)
                setDueDate(parseDate(res.data.dueDate))
                setGrade(res.data.grade)
                setPercentageOfFinal(res.data.percentageOfFinal)
                setStatus(res.data.status)
            } else {
                console.error('something went wrong')
            }
            setLoading(false)
        }
        getData()
    }, [])

    function handleSubmit(e: any) {
        alert('submitting')
    }

    function handleNumberInput(
        e: any,
        val: number,
        _update: (v: number) => void,
        _err: (b: boolean) => void
    ) {
        _err(false)
        const numberInput = Number(e.target.value)
        if (!isNaN(numberInput)) {
            _update(numberInput)
        } else {
            _err(true)
        }
    }

    const labelStyles = 'flex flex-row gap-2'
    const inputStyles =
        'transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'

    return (
        <div className='absolute z-10 top-0 right-0 w-screen h-screen bg-white flex items-center justify-center'>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='w-2/3 h-2/3 border'>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        action='#'
                        className='flex flex-col gap-2 border p-8 w-fit'>
                        <label className={labelStyles}>
                            Assignment name:
                            <input
                                className={inputStyles}
                                type='text'
                                value={assignmentName}
                                onChange={(e) => setAssignmentName(e.target.value)}
                            />
                        </label>
                        <label className={labelStyles}>
                            Due date:
                            <DatePicker
                                selected={dueDate}
                                onChange={(date: Date) => setDueDate(date)}
                            />
                        </label>
                        <label className={labelStyles}>
                            Status:
                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as 'todo' | 'submitted' | 'graded')
                                }>
                                <option value='todo'>Todo</option>
                                <option value='submitted'>Submitted</option>
                                <option value='graded'>Graded</option>
                            </select>
                        </label>
                        <label
                            className={`${labelStyles} ${percentageOfFinalErr && 'text-red-500'}`}>
                            Percentage of final grade:
                            <input
                                className={inputStyles}
                                type='text'
                                value={percentageOfFinal}
                                onChange={(e) =>
                                    handleNumberInput(
                                        e,
                                        percentageOfFinal,
                                        setPercentageOfFinal,
                                        setPercentageOfFinalErr
                                    )
                                }
                            />
                        </label>
                        {status !== 'todo' && (
                            <label className={`${labelStyles} ${gradeErr && 'text-red-500'}`}>
                                {status === 'graded' ? 'Grade:' : 'Expected grade:'}
                                <input
                                    className={inputStyles}
                                    type='text'
                                    value={grade}
                                    onChange={(e) =>
                                        handleNumberInput(e, grade, setGrade, setGradeErr)
                                    }
                                />
                            </label>
                        )}
                        <div className='flex flex-row gap-2'>
                            <button
                                className='rounded transition-colors border-2 border-orange-600 text-orange-600 px-2 py-1 font-bold hover:border-transparent hover:text-white hover:bg-orange-600'
                                type='submit'>
                                {loading ? 'Loading...' : 'Submit'}
                            </button>
                            <button onClick={() => setConfirmCancel(true)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default UpdateGrades
