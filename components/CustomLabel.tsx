import React from 'react'

const CustomLabel: React.FC<{ children: any; half?: boolean }> = ({ children, half }) => {
    return <label className={`flex flex-col ${half ? 'w-[48%]' : ''}`}>{children}</label>
}

export default CustomLabel
