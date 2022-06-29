import Link from 'next/link'
import React, { useState } from 'react'
import { Logout } from '../hooks/Logout'

const UserIcon: React.FC<{ finitial: string; linitial: string }> = ({ finitial, linitial }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [showConfirmLogout, setShowConfirmLogout] = useState<boolean>(false)

    return (
        <div>
            <div
                onClick={() => setOpen(!open)}
                className='uppercase select-none cursor-pointer w-10 h-10 rounded-full border-2 border-black flex justify-center items-center text-center font-bold'>
                {finitial}
                {linitial}
            </div>
            {open && (
                <div className='rounded absolute w-1/6 h-fit right-10 px-4 py-6 bg-gray-400 flex flex-col gap-1 items-center'>
                    <Link href='/user/profile'>
                        <div className='cursor-pointer transition-all hover:text-orange-800 hover:font-bold'>
                            My Profile
                        </div>
                    </Link>
                    <Link href='/user/preferences'>
                        <div className='cursor-pointer transition-all hover:text-orange-800 hover:font-bold'>
                            Preferences
                        </div>
                    </Link>
                    <Link href='/app/about'>
                        <div className='cursor-pointer transition-all hover:text-orange-800 hover:font-bold'>
                            How to use
                        </div>
                    </Link>
                    <div
                        className='cursor-pointer transition-all hover:text-orange-800 hover:font-bold'
                        onClick={() => {
                            setShowConfirmLogout(true)
                            setOpen(false)
                        }}>
                        Logout
                    </div>
                </div>
            )}
            {showConfirmLogout && (
                <div className='p-8 w-1/3 bg-gray-200 absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex flex-col gap-2 items-center'>
                    <h1>Are you sure you want to log out?</h1>
                    <div className='flex flex-row gap-2'>
                        <button
                            onClick={() => Logout()}
                            className='transition-colors text-green-600 font-bold border border-green-600 px-2 hover:border-transparent hover:text-white hover:bg-green-600'>
                            Confirm
                        </button>
                        <button
                            onClick={() => setShowConfirmLogout(false)}
                            className='text-red-500'>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserIcon
