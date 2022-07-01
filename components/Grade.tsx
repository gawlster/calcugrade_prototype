import React from 'react'

const Grade: React.FC<{ grade: number; type: string }> = ({ grade, type }) => {
    return (
        <div className='w-16 aspect-square flex flex-col justify-center items-center border border-dark p-2'>
            <div className='font-semibold text-lg text-dark select-none'>{grade}%</div>
            <div className='font-light text-[0.6rem] select-none'>{type}</div>
        </div>
    )
}

export default Grade
