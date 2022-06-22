import axios from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { User, defaultUser } from '../Types'

const Dashboard = () => {
    const [loadingPage, setLoadingPage] = useState<boolean>(true)

    const [userID, setUserID] = useState<string>()
    const [userInfo, setUserInfo] = useState<User>(defaultUser)

    useEffect(() => {
        async function getData() {
            const userID = localStorage.getItem('curUserID')
            if (userID) {
                setUserID(userID)
                const curUserInfo = await axios.post('/api/GetCurrentUserInfo', { uid: userID })
                setUserInfo(curUserInfo.data)
            } else {
                window.location.pathname = '/login'
            }
            setLoadingPage(false)
        }
        getData()
    }, [])

    return (
        <div>{loadingPage ? <div>Loading...</div> : <div>{userInfo.fname}'s Dashboard.</div>}</div>
    )
}

export default Dashboard
