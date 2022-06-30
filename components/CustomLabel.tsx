import React from 'react'

const CustomLabel: React.FC<{ children: any }> = ({ children }) => {
    return <label className='flex flex-col'>{children}</label>
}

export default CustomLabel
