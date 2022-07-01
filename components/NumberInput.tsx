import React from 'react'

const NumberInput: React.FC<{
    min?: number
    max?: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: any
}> = ({ min, max, onChange, value }) => {
    return (
        <input
            className='transition-colors outline-0 focus:outline-0 p-3 border border-dark focus:border-light'
            type='number'
            min={min ?? 0}
            max={max ?? 100}
            onChange={(e) => onChange(e)}
            value={value}
        />
    )
}

export default NumberInput
