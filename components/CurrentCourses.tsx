import { useRouter } from 'next/router'
import React from 'react'
import { CourseType, UserType } from '../Types'
import Course from './Course'

const CurrentCourses: React.FC<{ userInfo: UserType; small: boolean }> = ({ userInfo, small }) => {
    const router = useRouter()

    return (
        <div className='h-full'>
            <div className='h-[95%] overflow-auto'>
                {userInfo.courses.map((course: CourseType) => {
                    return (
                        <Course
                            key={course._id}
                            small={small}
                            userInfo={userInfo}
                            courseInfo={course}
                        />
                    )
                })}
            </div>
            <div
                className='text-center cursor-pointer text-mid hover:font-bold transition-all'
                onClick={() => router.push(`/user/course/${userInfo._id}`)}>
                Add a course
            </div>
        </div>
    )
}

export default CurrentCourses
