import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';

import Select from 'react-select';

export default function CV() {
    const [name, setName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    function handleDateChange(date: Date | null) {
        setSelectedDate(date);
    }

    const options = [
        { value: 'passport', label: 'Passport / ID:' },
        { value: 'seamna', label: 'Seaman´s Book' },
        { value: 'visa', label: 'VISA' }
    ];

    const experienceOptions = [
        { value: 'job-1', label: 'Job tilte 1' },
        { value: 'job-2', label: 'Job title 2' },
        { value: 'custom', label: 'CUSTOM' }
    ]

    const vesselOptions = [
        { value: 'vessel_1', label: 'Vessel 1' },
        { value: 'vessel_2', label: 'Vessel 2' }
    ]

    const yearsOptions = [
        { value: '1', label: 'a year' },
        { value: '2', label: '2 years' },
        { value: '3', label: '3 years' },
        { value: '4', label: '4 years' },
        { value: '5', label: '5 years' },
        { value: '6', label: '6 years' },
        { value: '7', label: '7 years' },
        { value: '8', label: '8 years' },
        { value: '9', label: '9 years' },
        { value: '10', label: '10 years' }
    ]

    const certificateOptions = [
        { value: 'food', label: 'Food Safety and HACPP ' },
        { value: 'onshore_cook', label: 'Onshore Cooks Certificate ' },
        { value: 'custom', label: 'CUSTOM' }
    ]

    const medicalOptions = [
        { value: 'OGUK', label: 'OGUK' },
        { value: 'medical', label: 'Seafarers Medical' }
    ]

    const offshoreOptions = [
        { value: 'training', label: 'Basic Safety Training' },
        { value: 'BOSIET_5700', label: 'BOSIET 5700' },
        { value: 'custom', label: 'CUSTOM' }
    ]

    return (
        <div className='pt-[75px] mb-[90px]'>
            <div className='flex justify-between w-[148px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/about_project">CV Creator</Link>
            </div>
            <form>
                <div style={{ padding: "50px 58px 80px 58px" }} className='back-cv flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[67px] pl-[58px] gap-[47px] mt-[80px]'>
                    <div className='flex'>
                        <p className='text-[48px] leading-[56px] font-[600] w-[40%] text-[#116ACC] mt-[120px]'>Personal Data</p>
                        <div className='w-[60%] flex justify-end mr-[30px]'>
                            <img src='/image/avatar.png' alt='avatar' />
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
                                    Gender:
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
                                    Other links:
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
                        </div>
                    </div>
                </div>
            </form>

            {/* Document element */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Documents</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="All" options={options} />
                    <button id="plus" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#116ACC] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/plus_black.png' alt="x" />
                    </button>
                </div>
                {/* Seamans's Book element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>Seamans's Book</div>
                        <div className='flex justify-end w-[20%]'>
                            <button className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Number:
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
                                    Country:
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
                        </div>

                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Issue Date:
                                </div>
                                <div className='w-[70%]'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField
                                                onClick={() => console.log("asd")}
                                                sx={{
                                                    width: 300,
                                                    backgroundColor: "#fff",
                                                    marginLeft: '17px'
                                                }}
                                                {...params}
                                            />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Expiry Date:
                                </div>
                                <div className='w-[70%]'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField
                                                onClick={() => console.log("asd")}
                                                sx={{
                                                    width: 300,
                                                    backgroundColor: "#fff",
                                                    marginLeft: "17px"
                                                }} {...params}
                                            />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Document element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Documents</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Document Type</th>
                                <th className='w-[16.7%]'>Country</th>
                                <th className='w-[16.7%]'>Number</th>
                                <th className='w-[16.6%]'>Issue Date</th>
                                <th className='w-[20%]'>Expiration Date</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-start'>passport</td>
                                <td className='text-start'>Latvia</td>
                                <td className='text-start'>LV343435545645</td>
                                <td className='text-start'>20.05.2000.</td>
                                <td className='text-start'>20.05.2030.</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>passport</td>
                                <td className='text-start'>Latvia</td>
                                <td className='text-start'>LV343435545645</td>
                                <td className='text-start'>20.05.2000.</td>
                                <td className='text-start'>20.05.2030.</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Maritime experience element */}
            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Maritime experience</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" options={experienceOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Vessel"
                        type="text"
                        value={name}
                        onChange={handleChange}
                    />
                    <button id="check" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                    <button id="plus" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#116ACC] mt-[13px] ml-[10px] h-[38px]'>
                        <img src='/image/plus_black.png' alt="x" />
                    </button>
                </div>
                {/* Job title element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>Job title 2</div>
                        <div className='flex justify-end w-[20%]'>
                            <button className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex'>
                            <div className='w-[15%] label-style pt-[6px] flex justify-end'>
                                Types of vessels:
                            </div>
                            <div className='w-[85%] flex'>
                                <Select className='w-[300px] rounded-[10px] ml-[17px]' placeholder="..." options={vesselOptions} />

                                <input
                                    style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                    className='w-[300px] ml-[17px] h-[38px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                    placeholder="Type your Vessel"
                                    type="text"
                                    value={name}
                                    onChange={handleChange}
                                />

                                <button id="check" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] ml-[23px] h-[38px]'>
                                    <img src='/image/check.png' alt="x" />
                                </button>
                                <button id="plus" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#116ACC] ml-[10px] h-[38px]'>
                                    <img src='/image/plus_black.png' alt="x" />
                                </button>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='w-[57%] flex'>
                                <div className='w-[26.5%] label-style pt-[6px] flex justify-end'>
                                    Clients:
                                </div>
                                <div className='w-[73.5%] flex'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[38px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type Clients"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='w-[43%] flex'>
                                <div className='w-[30%] label-style pt-[6px] flex justify-end'>
                                    Years:
                                </div>
                                <div className='w-[70%] flex'>
                                    <Select className='w-[300px] rounded-[10px] ml-[17px]' placeholder="Please select" options={yearsOptions} />
                                </div>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='w-[15%] label-style pt-[6px] flex justify-end'>
                                Crewing's, Employers:
                            </div>
                            <div className='w-[85%]'>
                                <input
                                    style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                    className='w-[300px] ml-[17px] h-[38px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                    placeholder="Type Crewing's, Employers"
                                    type="text"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Experience element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Experience</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Job title</th>
                                <th className='w-[16.7%]'>Years</th>
                                <th className='w-[16.7%]'>Type of vessels</th>
                                <th className='w-[16.6%]'>Clients</th>
                                <th className='w-[20%]'>Crewing's Employers</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-start'>Job title 1</td>
                                <td className='text-start'>5</td>
                                <td className='text-start'>Vessel 1 </td>
                                <td className='text-start'>Clients</td>
                                <td className='text-start'>Crewing's, Employers</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>CUSTOM</td>
                                <td className='text-start'>5</td>
                                <td className='text-start'>Vessel 2 </td>
                                <td className='text-start'>Clients</td>
                                <td className='text-start'>Crewing's, Employers</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Certificate of Competency */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Certificate of Competency</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" options={certificateOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Vessel"
                        type="text"
                        value={name}
                        onChange={handleChange}
                    />
                    <button id="check" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                    <button id="plus" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#116ACC] mt-[13px] ml-[10px] h-[38px]'>
                        <img src='/image/plus_black.png' alt="x" />
                    </button>
                </div>
                {/* Onshore Cooks Certificate element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>Onshore Cooks Certificate</div>
                        <div className='flex justify-end w-[20%]'>
                            <button className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex w-full'>
                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Number:
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
                                        Issue Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: '17px'
                                                    }}
                                                    {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Expiry Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: "17px"
                                                    }} {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Certificates of Competency element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Certificates of Competency</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Name</th>
                                <th className='w-[20%]'>Number</th>
                                <th className='w-[20%]'>Issue Date</th>
                                <th className='w-[30%]'>Expiry Date</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>Food Safety and HACPP </td>
                                <td className='text-start'>HACPP122324324325</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-start'>Food Safety and HACPP </td>
                                <td className='text-start'>HACPP122324324325</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Medical Certificate element */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Medical Certificate </p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" options={medicalOptions} />
                    <button id="plus" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#116ACC] mt-[13px] ml-[10px] h-[38px]'>
                        <img src='/image/plus_black.png' alt="x" />
                    </button>
                </div>
                {/* Seafarers Medical element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>Seafarers Medical</div>
                        <div className='flex justify-end w-[20%]'>
                            <button className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex w-full'>
                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Number:
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
                                        Issue Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: '17px'
                                                    }}
                                                    {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Expiry Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: "17px"
                                                    }} {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Medical Certificates element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Certificates of Competency</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Name</th>
                                <th className='w-[20%]'>Number</th>
                                <th className='w-[20%]'>Issue Date</th>
                                <th className='w-[30%]'>Expiry Date</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>Seafarers Medical</td>
                                <td className='text-start'>HACPP122324324325</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-start'>OGUK</td>
                                <td className='text-start'>24214325436567</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Certificates STCW and Offshore  */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Certificates STCW and Offshore</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" options={offshoreOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Vessel"
                        type="text"
                        value={name}
                        onChange={handleChange}
                    />
                    <button id="check" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                    <button id="plus" style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#116ACC] mt-[13px] ml-[10px] h-[38px]'>
                        <img src='/image/plus_black.png' alt="x" />
                    </button>
                </div>
                {/* BOSIET 5700 element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>BOSIET 5700</div>
                        <div className='flex justify-end w-[20%]'>
                            <button className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex w-full'>
                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Number:
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
                                        Issue Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: '17px'
                                                    }}
                                                    {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Expiry Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: "17px"
                                                    }} {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Certificates STCW and Offshore element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Certificates STCW and Offshore</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Name</th>
                                <th className='w-[20%]'>Number</th>
                                <th className='w-[20%]'>Issue Date</th>
                                <th className='w-[30%]'>Expiry Date</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>Basic Safety Training</td>
                                <td className='text-start'>HACPP122324324325</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-start'>CUSTOM</td>
                                <td className='text-start'>24214325436567</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}
