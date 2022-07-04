import React from 'react'

const Grade: React.FC<{ grade: number; type: string; small: boolean }> = ({
    grade,
    type,
    small,
}) => {
    return (
        <div
            className={`${
                small ? 'w-12' : 'w-16'
            } aspect-square flex flex-col justify-center items-center border border-dark p-2 overflow-hidden`}>
            <div className={`font-semibold ${small ? 'text-md' : 'text-lg'} text-dark select-none`}>
                {Math.round(grade * 10) / 10}%
            </div>
            <div className={`font-light ${small ? 'text-[0.45rem]' : 'text-[0.6rem]'} select-none`}>
                {type}
            </div>
        </div>
    )
}

export default Grade
