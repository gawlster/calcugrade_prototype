import React from 'react'
import { CourseType, UserType } from '../Types'
import Course from './Course'

const CurrentCourses: React.FC<{ userInfo: UserType }> = ({ userInfo }) => {
    return (
        <div>
            {userInfo.courses.map((course: CourseType) => {
                return <Course userInfo={userInfo} courseInfo={course} />
            })}
        </div>
    )
}

export default CurrentCourses
