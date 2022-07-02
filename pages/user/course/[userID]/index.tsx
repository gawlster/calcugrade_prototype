import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Banner from '../../../../components/Banner'
import Button from '../../../../components/Button'
import CustomForm from '../../../../components/CustomForm'
import CustomInput from '../../../../components/CustomInput'
import CustomLabel from '../../../../components/CustomLabel'

const NewCourse: NextPage = () => {
    const router = useRouter()
    const { userID, courseID } = router.query

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const [school, setSchool] = useState('')
    const [courseCode, setCourseCode] = useState('')
    const [courseName, setCourseName] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        try {
            await axios.post('/api/PostNewCourse', {
                userID: userID,
                school: school,
                courseCode: courseCode,
                courseName: courseName,
                earnedGrade: 0,
                expectedGrade: 0,
                onTrackGrade: 0,
                assignments: [],
            })
            router.push('/user/dashboard')
        } catch (err) {
            console.log(error)
        }

        setLoading(false)
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
                    <h1 className='font-semibold text-center text-3xl text-dark'>Add a course</h1>
                    <CustomLabel>
                        School:
                        <CustomInput
                            onChange={(e) => setSchool(e.target.value)}
                            type='text'
                            value={school}
                        />
                    </CustomLabel>
                    <CustomLabel>
                        Course code:
                        <CustomInput
                            onChange={(e) => setCourseCode(e.target.value)}
                            type='text'
                            value={courseCode}
                        />
                    </CustomLabel>
                    <CustomLabel>
                        Course name:
                        <CustomInput
                            onChange={(e) => setCourseName(e.target.value)}
                            type='text'
                            value={courseName}
                        />
                    </CustomLabel>

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

export default NewCourse
