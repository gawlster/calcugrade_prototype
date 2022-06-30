import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ErrorBanner: React.FC<{
    message: string
    type: string
    close: (visible: boolean) => void
}> = ({ message, type, close }) => {
    return (
        <div
            className={`absolute top-0 w-screen p-5 text-black ${
                type === 'error' ? 'bg-red-400' : 'bg-yellow-400'
            }`}>
            <div className={`w-full flex flex-row justify-between items-center`}>
                <div>{message}</div>
                <div className='cursor-pointer' onClick={() => close(false)}>
                    <FontAwesomeIcon fontSize={'20px'} icon={faXmark} />
                </div>
            </div>
        </div>
    )
}

export default ErrorBanner
