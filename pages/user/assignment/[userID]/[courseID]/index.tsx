import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Banner from '../../../../../components/Banner'
import Button from '../../../../../components/Button'
import CustomForm from '../../../../../components/CustomForm'
import CustomInput from '../../../../../components/CustomInput'
import CustomLabel from '../../../../../components/CustomLabel'
import NumberInput from '../../../../../components/NumberInput'

const NewAssignment: NextPage = () => {
    const router = useRouter()
    const { userID, courseID } = router.query

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const [assignmentName, setAssignmentName] = useState('')
    const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [status, setStatus] = useState<'todo' | 'submitted' | 'graded'>('todo')
    const [percentageOfFinal, setPercentageOfFinal] = useState('')
    const [grade, setGrade] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        try {
            const earnedOfFinal = calcEarnedOfFinal(Number(grade), Number(percentageOfFinal))
            const toSend = {
                userID: userID,
                courseID: courseID,
                assignmentName: assignmentName,
                percentageOfFinal: percentageOfFinal,
                status: status,
                dueDate: dueDate,
                grade: grade,
                earnedOfFinal: earnedOfFinal,
            }
            const res = await axios.post('/api/PostNewAssignment', toSend)
            router.push('/user/dashboard')
        } catch (err) {
            //do nothing
        }
        setLoading(false)
    }

    function calcEarnedOfFinal(grade: number, pof: number) {
        if (isNaN(grade) || isNaN(pof)) {
            setError(true)
            throw new Error()
        } else {
            if (pof === 0) return 0
            if (grade === 0) return 0
            return grade * (pof / 100)
        }
    }

    function validate(s: string, min: number, max: number, _f: (v: string) => void) {
        const newVal = Number(s)
        if (!isNaN(newVal) && newVal >= min && newVal <= max) {
            _f(String(newVal))
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            {error && (
                <Banner
                    message='Sorry, there was an error'
                    close={() => setError(false)}
                    type='error'
                />
            )}
            <div className='w-4/5 max-w-md'>
                <CustomForm onSubmit={(e) => handleSubmit(e)}>
                    <h1 className='font-semibold text-center text-3xl text-dark'>
                        Create an assignment
                    </h1>
                    <CustomLabel>
                        Assignment name:
                        <CustomInput
                            onChange={(e) => setAssignmentName(e.target.value)}
                            type='text'
                            value={assignmentName}
                        />
                    </CustomLabel>
                    <div className='flex flex-row justify-between items-center'>
                        <CustomLabel half={true}>
                            Due date:
                            <CustomInput
                                onChange={(e) => setDueDate(e.target.value)}
                                type='date'
                                value={dueDate}
                            />
                        </CustomLabel>
                        <CustomLabel half={true}>
                            Status:
                            <select
                                className='transition-colors outline-0 focus:outline-0 p-3 border border-dark focus:border-light'
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as 'todo' | 'submitted' | 'graded')
                                }>
                                <option value='todo'>Todo</option>
                                <option value='submitted'>Submitted</option>
                                <option value='graded'>Graded</option>
                            </select>
                        </CustomLabel>
                    </div>
                    <div
                        className={`${
                            status !== 'todo' ? 'flex flex-row justify-between items-center' : ''
                        }`}>
                        <CustomLabel half={status !== 'todo'}>
                            Percentage of final:
                            <NumberInput
                                onChange={(e) =>
                                    validate(e.target.value, 0, 100, setPercentageOfFinal)
                                }
                                value={percentageOfFinal}
                                min={0}
                                max={100}
                            />
                        </CustomLabel>
                        {status !== 'todo' && (
                            <CustomLabel half={true}>
                                Grade:
                                <NumberInput
                                    onChange={(e) => validate(e.target.value, 0, 100, setGrade)}
                                    value={grade}
                                    min={0}
                                    max={100}
                                />
                            </CustomLabel>
                        )}
                    </div>
                    <Button submit={true} onClick={() => void 0} className='w-full' opposite={true}>
                        {loading ? 'Loading...' : 'Create assignment'}
                    </Button>
                    <div className='text-center'>
                        <Link href='/user/dashboard'>Cancel</Link>
                    </div>
                </CustomForm>
            </div>
        </div>
    )
}

export default NewAssignment
