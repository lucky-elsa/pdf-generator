import React from 'react'

interface Input {
    placeholder: string,
    type: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputArea(props: Input) {

    return (
        <>
            <input
                style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                placeholder={props.placeholder}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
            />
        </>
    )
}
