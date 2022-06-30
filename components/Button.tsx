import React from 'react'

const Button: React.FC<{
    className: string
    onClick: () => void
    children: any
    opposite?: boolean
    submit?: boolean
}> = ({ className, onClick, children, opposite, submit }) => {
    return (
        <div className={className}>
            <button
                type={submit ? 'submit' : 'button'}
                onClick={() => onClick()}
                className={`transition-colors text-xl w-full font-bold border-2 px-5 py-1 ${
                    opposite
                        ? 'text-white bg-mid border-transparent hover:text-mid hover:bg-transparent hover:border-mid'
                        : 'text-mid border-mid hover:bg-mid hover:text-white'
                } `}>
                {children}
            </button>
        </div>
    )
}

export default Button
