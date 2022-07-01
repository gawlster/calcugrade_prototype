import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Banner: React.FC<{
    message: string
    type: string
    close: () => void
    nox?: boolean
}> = ({ message, type, close, nox }) => {
    return (
        <div
            className={`absolute z-50 top-0 w-screen p-5 text-black ${
                type === 'error'
                    ? 'bg-red-400'
                    : type === 'success'
                    ? 'bg-green-400'
                    : 'bg-yellow-500'
            }`}>
            <div className={`w-full flex flex-row justify-between items-center`}>
                <div>{message}</div>
                {!nox && (
                    <div className='cursor-pointer' onClick={() => close()}>
                        <FontAwesomeIcon fontSize={'20px'} icon={faXmark} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Banner
