import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const NewAssignment: NextPage = () => {
    const router = useRouter()
    const { userID, courseID } = router.query

    return (
        <div>
            {userID} | {courseID}
        </div>
    )
}

export default NewAssignment
