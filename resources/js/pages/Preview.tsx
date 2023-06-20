import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';

import Select from 'react-select';

export default function Preview() {
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

    const langOptions = [
        { value: 'latvian', label: 'Latvian' },
        { value: 'russian', label: 'Russian' },
        { value: 'english', label: 'English' }
    ]

    return (
        <div className='pt-[75px] mb-[90px]'>
            <div className='flex justify-between w-[130px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/about_project">Preview</Link>
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
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    Janis Jurnieks
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Citizenship:
                                </div>
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    Latvian
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Country of residence:
                                </div>
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    Latvia
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Nearest Airport:
                                </div>
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    Riga RIX
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Gender:
                                </div>
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    Male
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Phone number:
                                </div>
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    (+371) 2222 2222
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    E-mail:
                                </div>
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    email@email.lv
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    PDF link:
                                </div>
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    <button>CREATE PDF</button>
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] font-[500] label-style pt-[10px] flex justify-end'>
                                    Other links:
                                </div>
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    LinkedIn
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Date of Birth:
                                </div>
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[3px] ml-[45px] text-[#4B5563]'>
                                    20.09.1955
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
                </div>
                {/* Your Document element */}
                <div className='flex flex-col gap-[25px] mt-[30px] mb-[40px]'>
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
                </div>
                {/* Your Experience element */}
                <div className='flex flex-col gap-[25px] mt-[30px] mb-[40px]'>
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
                </div>
                {/* Your Certificates of Competency element */}
                <div className='flex flex-col gap-[25px] mt-[30px] mb-[40px]'>
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
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Medical Certificate</p>
                </div>
                {/* Your Medical Certificates element */}
                <div className='flex flex-col gap-[25px] mt-[30px] mb-[40px]'>
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
                </div>
                {/* Your Certificates STCW and Offshore element */}
                <div className='flex flex-col gap-[25px] mt-[30px] mb-[40px]'>
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

            {/* Sea Experience element */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[67px] pl-[58px] gap-[47px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] w-[40%] text-[#116ACC]'>Sea experience </p>
                </div>
                {/* Your Sea Experience element */}
                <div className='flex flex-col gap-[25px] mt-[30px] mb-[40px]'>
                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[14%]'>Vessel</th>
                                <th className='w-[14%]'>Vessel Type</th>
                                <th className='w-[12%]'>Rank</th>
                                <th className='w-[14%]'>Contracts</th>
                                <th className='w-[18%]'>Contract Duration</th>
                                <th className='w-[18%]'>Description</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>Vessel Name</td>
                                <td className='text-start'>Vessel Type</td>
                                <td className='text-start'>Captain</td>
                                <td className='text-start'>20</td>
                                <td className='text-start'>6 months</td>
                                <td className='text-start'>I was the main on the board</td>
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
                                <td className='text-start'>Vessel Name</td>
                                <td className='text-start'>Vessel Type</td>
                                <td className='text-start'>Captain</td>
                                <td className='text-start'>20</td>
                                <td className='text-start'>6 months</td>
                                <td className='text-start'>I was the main on the board</td>
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

            {/* Additional information   */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Additional information</p>
                </div>
                {/* Your Additional Information element */}
                <div className='flex flex-col gap-[25px] mt-[30px] mb-[40px]'>
                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[25%]'>Languages</th>
                                <th className='w-[25%]'>Computer</th>
                                <th className='w-[40%]'>Additional trainings and skills</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>LV/ENG/RUS</td>
                                <td className='text-start'>Word/Excel/Explorer</td>
                                <td className='text-start'>I am very trained </td>
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

            <div className='flex justify-end mr-[100px] mt-[96px] pt-[96x]'>
                <button className='mt-[96x] bg-[#116ACC] rounded-[7px] w-[117px] h-[52px] text-[16px] font-[500] text-[#fff]' type='button'>PREVIEW</button>
            </div>
        </div>
    )
}