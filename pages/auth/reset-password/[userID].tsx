import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const ResetPassword: NextPage = () => {
    const router = useRouter()
    const { userID } = router.query

    return <div>resetting password for {userID}</div>
}

export default ResetPassword
