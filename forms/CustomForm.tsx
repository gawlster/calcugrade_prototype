import React, { FormEventHandler } from 'react'

const CustomForm: React.FC<{
    children: any
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    center?: boolean
}> = ({ children, onSubmit, center }) => {
    return (
        <form
            className={`w-full h-full border-2 border-dark p-8 flex flex-col justify-center ${
                center && 'items-center'
            }`}
            onSubmit={(e) => onSubmit(e)}>
            {children}
        </form>
    )
}

export default CustomForm
