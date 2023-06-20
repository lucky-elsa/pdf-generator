import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';

import ImageUpload from '../components/ImageUpload';

export default function Register() {
    const [name, setName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    function handleDateChange(date: Date | null) {
        setSelectedDate(date);
    }

    const changeText = () => {
        const text = document.querySelector('.MuiDialogActions-root');
        console.log(text)
    }

    const handleCropping = (dataUrl: string) => {
        console.log(dataUrl);
    };

    const croppingProps = {
        imageSrc: "your-image-url",
        width: 300,
        height: 200,
        onChange: handleCropping,
    };

    return (
        <div className='pt-[75px] mb-[90px]'>
            <div className='flex justify-between w-[163px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/about_project">Add Crewing</Link>
            </div>

            <form>
                <div style={{ padding: "50px 58px 80px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[67px] pl-[58px] gap-[47px] mt-[80px]'>
                    <div className='flex'>
                        <p className='text-[48px] leading-[56px] font-[600] w-[40%] text-[#116ACC] mt-[120px]'>Register</p>
                        <div className='w-[60%] flex justify-end mr-[30px]'>
                            <ImageUpload />
                        </div>
                    </div>
                    <div style={{ border: "1px dashed #7B61FF", padding: "58px 71px" }} className='flex rounded-[5px] w-full box-border'>
                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Name:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Surname:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your citizenship"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Citizenship:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Country of residence:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Nearest Airport:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Phone number:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your phone number"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    E-mail:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your email"
                                        type="email"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Date of Birth:
                                </div>
                                <div className='w-[70%] ml-[22px]'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField
                                                onClick={() => console.log("asd")}
                                                sx={{
                                                    width: 300,
                                                    backgroundColor: "#fff",
                                                }} {...params}
                                            />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Password:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your Password"
                                        type="password"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Confirm Password:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Confirm your password"
                                        type="password"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center mt-[40px] mr-[80px]'>
                    <button type="button" className='bg-[#116ACC] rounded-[7px] pt-[16px] pb-[16px] pl-[24px] pr-[24px] text-[#fff] text-center hover:bg-[#116bccc5] active:bg-[#116bcca6]'>
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
