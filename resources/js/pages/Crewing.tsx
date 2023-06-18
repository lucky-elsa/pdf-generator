import React from 'react'
import { Link } from 'react-router-dom'

export default function Crewing() {
    return (
        <div className='pt-[75px] mb-[90px]'>
            <div className='flex justify-between w-[183px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/about_project">Crewings Board</Link>
            </div>

            <div style={{ padding: "48px 58px" }} className='flex flex-col h-[620px] bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Crewings Board Data</p>
            </div>
        </div>
    )
}
