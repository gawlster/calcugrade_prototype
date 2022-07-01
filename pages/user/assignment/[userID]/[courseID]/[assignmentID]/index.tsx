import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const EditAssignment: NextPage = () => {
    const router = useRouter()
    const { userID, courseID, assignmentID } = router.query

    return (
        <div>
            {userID} | {courseID} | {assignmentID}
        </div>
    )
}

export default EditAssignment
