import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Assignment } from '../Types'
import DatePicker from 'react-datepicker'

const Course: React.FC<{
    courseID: string
    courseCode: string
    earnedGrade: string
    estimatedGrade: string
    onTrackGrade: string
    assignments: Assignment[]
    _update: () => void
}> = ({
    courseID,
    courseCode,
    earnedGrade,
    estimatedGrade,
    onTrackGrade,
    assignments,
    _update,
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [creatingAssignment, setCreatingAssignment] = useState<boolean>(false)

    const gradeCardStyles = 'flex flex-col items-center justify-center border p-1'

    return (
        <div>
            {creatingAssignment ? (
                <CreateAssignmentForm
                    cid={courseID}
                    _close={() => setCreatingAssignment(false)}
                    _update={() => _update()}
                />
            ) : (
                <div className='w-full h-fit px-4 py-2 border flex flex-col gap-1'>
                    <div
                        className='flex flex-row justify-between items-center cursor-pointer'
                        onClick={() => setOpen(!open)}>
                        <div className='text-xl font-bold'>{courseCode}</div>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <div className={gradeCardStyles}>
                                <div className='text-lg font-semibold'>{earnedGrade}%</div>
                                <div className='text-sm italic'>EARNED</div>
                            </div>
                            <div className={gradeCardStyles}>
                                <div className='text-lg font-semibold'>{estimatedGrade}%</div>
                                <div className='text-sm italic'>ESTIMATED</div>
                            </div>
                            <div className={gradeCardStyles}>
                                <div className='text-lg font-semibold'>{onTrackGrade}%</div>
                                <div className='text-sm italic'>ON TRACK</div>
                            </div>
                        </div>
                    </div>
                    {open && (
                        <div className='p-2'>
                            {assignments.length === 0 ? (
                                <div className='text-center'>
                                    No assignments to show.{' '}
                                    <div
                                        className='inline cursor-pointer'
                                        onClick={() => setCreatingAssignment(true)}>
                                        Add some now?
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-3'>
                                    {assignments.map((assignment) => {
                                        return (
                                            <Assignment
                                                key={assignment._id}
                                                assignment={assignment}
                                            />
                                        )
                                    })}
                                    <div
                                        className='text-center cursor-pointer'
                                        onClick={() => setCreatingAssignment(true)}>
                                        Add an assignment
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

const Assignment: React.FC<{ assignment: Assignment }> = ({ assignment }) => {
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
        console.log(datestr)
        const [year, month, day] = datestr.split('-')
        let toReturn = `${months[Number(month) - 1]} ${day}, ${year}`
        return toReturn
    }

    return (
        <div className='flex flex-col gap-2'>
            <div>
                {assignment.assignmentName}:{' '}
                {assignment.status !== 'todo'
                    ? `${assignment.status}`
                    : `Due ${formatDate(assignment.dueDate)}`}
            </div>
            <div className='flex flex-row justify-around'>
                <div>Worth {assignment.percentageOfFinal}%</div>
                <div>
                    {assignment.status === 'graded'
                        ? `Got ${assignment.grade}%`
                        : assignment.status === 'submitted'
                        ? `Expected ${assignment.grade}%`
                        : ''}
                </div>
                <div>
                    {assignment.status === 'graded'
                        ? `Earned ${assignment.earnedOfFinal}% of final grade`
                        : assignment.status === 'submitted'
                        ? `Expected ${assignment.earnedOfFinal}% of final grade`
                        : ''}
                </div>
            </div>
        </div>
    )
}

const CreateAssignmentForm: React.FC<{ cid: string; _close: () => void; _update: () => void }> = ({
    cid,
    _close,
    _update,
}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [userID, setUserID] = useState<string>('')

    const [percentageOfFinalErr, setPercentageOfFinalErr] = useState<boolean>(false)
    const [gradeErr, setGradeErr] = useState<boolean>(false)

    const [confirmCancel, setConfirmCancel] = useState<boolean>(false)

    const [assignmentName, setAssignmentName] = useState<string>('')
    const [percentageOfFinal, setPercentageOfFinal] = useState<number>(0)
    const [status, setStatus] = useState<'graded' | 'submitted' | 'todo'>('todo')
    const [dueDate, setDueDate] = useState<Date>(new Date())
    const [grade, setGrade] = useState<number>(0)

    /* 
    earnedOfFinal: string */
    useEffect(() => {
        async function getData() {
            const curUserID = localStorage.getItem('curUserID')
            if (curUserID) {
                setUserID(curUserID)
            }
        }
        getData()
    })

    function cancelCreateAssignment() {
        setAssignmentName('')
        setPercentageOfFinal(0)
        setStatus('todo')
        setDueDate(new Date())
        setGrade(0)

        _close()
        _update()
    }

    async function calcEarnedOfFinal(percentageOfFinal: number, grade: number) {
        if (percentageOfFinal === 0) return 0
        if (grade === 0) return 0
        return grade * (percentageOfFinal / 100)
    }

    function handleNumberInput(
        e: any,
        val: number,
        _update: (v: number) => void,
        _err: (b: boolean) => void
    ) {
        _err(false)
        const numberInput = Number(e.target.value)
        console.log(numberInput)
        console.log(!isNaN(numberInput))
        if (!isNaN(numberInput)) {
            _update(numberInput)
        } else {
            _err(true)
        }
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)
        const earnedOfFinal = await calcEarnedOfFinal(percentageOfFinal, grade)
        const toSend = {
            userID: userID,
            courseID: cid,
            assignmentName: assignmentName,
            percentageOfFinal: percentageOfFinal,
            status: status,
            dueDate: dueDate,
            grade: grade,
            earnedOfFinal: earnedOfFinal,
        }
        const res = await axios.post('/api/PostNewAssignment', toSend)
        console.log(res)

        setLoading(false)
        _close()
        _update()
    }

    const labelStyles = 'flex flex-row gap-2'
    const inputStyles =
        'transition-colors focus:outline-0 border-b-2 border-black focus:border-orange-500'

    return (
        <div className='bg-white absolute top-0 left-0 right-0 bottom-0 min-w-screen min-h-screen flex flex-col gap-3 text-lg items-center justify-center'>
            <div className='text-xl font-semibold'>Add an assignment</div>
            <div>
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
                    <label className={`${labelStyles} ${percentageOfFinalErr && 'text-red-500'}`}>
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
                                onChange={(e) => handleNumberInput(e, grade, setGrade, setGradeErr)}
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
            {confirmCancel && (
                <div className='p-8 w-1/3 bg-gray-200 absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex flex-col gap-2 items-center'>
                    <h1>Are you sure you want to cancel? All progress will be lost.</h1>
                    <div className='flex flex-row gap-2'>
                        <button
                            onClick={() => {
                                setConfirmCancel(false)
                                cancelCreateAssignment()
                            }}
                            className='transition-colors text-green-600 font-bold border border-green-600 px-2 hover:border-transparent hover:text-white hover:bg-green-600'>
                            Yes, cancel
                        </button>
                        <button onClick={() => setConfirmCancel(false)} className='text-red-500'>
                            No, keep working
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Course
