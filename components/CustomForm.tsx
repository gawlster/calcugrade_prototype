import React from 'react'

const CustomForm: React.FC<{
    children: any
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    center?: boolean
}> = ({ children, onSubmit, center }) => {
    return (
        <div className='w-full h-full border-2 border-dark rounded px-8 py-[3.5rem] overflow-hidden'>
            <form
                className={`w-full h-full flex flex-col justify-center ${
                    center && 'items-center'
                } gap-4`}
                onSubmit={(e) => onSubmit(e)}>
                {children}
            </form>
        </div>
    )
}

export default CustomForm
