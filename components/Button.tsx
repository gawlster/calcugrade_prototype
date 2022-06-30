import React from 'react'

const Button: React.FC<{ className: string; onClick: () => void; children: any }> = ({
    className,
    onClick,
    children,
}) => {
    console.log(children)
    return (
        <div className={className}>
            <button
                onClick={() => onClick()}
                className='text-mid text-xl font-bold border-2 border-mid px-5 py-1 hover:bg-mid hover:text-white transition-colors'>
                {children}
            </button>
        </div>
    )
}

export default Button
