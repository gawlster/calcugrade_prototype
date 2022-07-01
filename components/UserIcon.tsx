import Link from 'next/link'
import React, { useState } from 'react'
import { Logout } from '../hooks/Logout'
import Confirm from './Confirm'

const UserIcon: React.FC<{ finitial: string; linitial: string }> = ({ finitial, linitial }) => {
    const [open, setOpen] = useState(false)
    const [showConfirmLogout, setShowConfirmLogout] = useState(false)

    const linkStyles = 'cursor-pointer transition-all hover:text-mid hover:font-bold'

    return (
        <div>
            {!open ? (
                <div
                    onClick={() => setOpen(!open)}
                    className='absolute top-6 right-5 uppercase select-none cursor-pointer w-10 h-10 rounded-full border-2 border-dark flex justify-center items-center text-center font-bold text-dark'>
                    {finitial}
                    {linitial}
                </div>
            ) : (
                <div className='rounded absolute w-2/5 h-fit right-4 top-5 py-16 border border-dark bg-white shadow-md flex flex-col gap-1 items-center'>
                    <div
                        className='transition-all cursor-pointer absolute top-3 right-5 select-none text-center hover:font-bold hover:text-mid'
                        onClick={() => setOpen(false)}>
                        X
                    </div>
                    <Link href='/user/profile'>
                        <div className={linkStyles}>My Profile</div>
                    </Link>
                    <Link href='/user/preferences'>
                        <div className={linkStyles}>Preferences</div>
                    </Link>
                    <Link href='/app/about'>
                        <div className={linkStyles}>How to use</div>
                    </Link>
                    <div
                        className={linkStyles}
                        onClick={() => {
                            setShowConfirmLogout(true)
                            setOpen(false)
                        }}>
                        Logout
                    </div>
                </div>
            )}
            {showConfirmLogout && (
                <Confirm
                    message='Are you sure you want to log out?'
                    confirm={() => Logout()}
                    confirmMSG='Yes, log out'
                    cancel={() => setShowConfirmLogout(false)}
                    cancelMSG='No, stay logged in'
                />
            )}
        </div>
    )
}

export default UserIcon
