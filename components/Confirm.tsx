import React from 'react'

const Confirm: React.FC<{
    message: string
    confirm: () => void
    confirmMSG: string
    cancel: () => void
    cancelMSG: string
}> = ({ message, confirm, confirmMSG, cancel, cancelMSG }) => {
    const buttonStyles = 'px-5 py-2 m-[2px] hover:m-0 hover:bg-transparent hover:border-2 text-lg'

    return (
        <div className='w-screen h-screen absolute z-50 top-0 right-0 bg-black bg-opacity-40 flex justify-center items-center'>
            <div className='bg-white border-2 border-dark px-10 py-10 flex flex-col gap-4'>
                <div className='text-center text-2xl'>{message}</div>
                <div className='flex flex-row gap-2 justify-center'>
                    <button
                        className={`${buttonStyles} bg-green-500 text-white font-bold hover:border-green-500 hover:text-green-500`}
                        onClick={() => confirm()}>
                        {confirmMSG}
                    </button>
                    <button
                        className={`${buttonStyles} bg-red-500 text-white font-bold hover:border-red-500 hover:text-red-500`}
                        onClick={() => cancel()}>
                        {cancelMSG}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirm
