import React from 'react'
import { Link } from 'react-router-dom'
import AboutComponent from '../components/about'
import ImageUpload from '../components/ImageUpload'

export default function About() {
    return (
        <div className='pt-[75px] mb-[90px]'>
            <div className='flex justify-between w-[170px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/about_project">About Project</Link>
            </div>

            <div className='flex flex-col gap-[95px] mt-[171px]'>
                <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[70px]'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Who We Are?</p>
                    <AboutComponent />
                </div>

                <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px]  gap-[70px]'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>For what we are?</p>
                    <AboutComponent />
                </div>

                <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px]  gap-[70px]'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>How it works?</p>
                    <AboutComponent />
                </div>

                <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px]  gap-[70px]'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Ok. What's next?</p>
                    <AboutComponent />
                </div>
            </div>
        </div>
    )
}
