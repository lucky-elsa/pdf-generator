import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import { setCategory, addCategory } from '../redux/reducers/categoryslice';
import { useAppDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';
import Select, { ActionMeta, SingleValue } from 'react-select';
import axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { event } from 'jquery';

export default function CV() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        axios.get('/api/category/getCategories')
            .then((res: AxiosResponse) => {
                dispatch(setCategory(res.data.data))
            })
    }, [dispatch])

    const categories = useSelector((state: RootState) => state.categories.category);      //    category items

    const [name, setName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    function handleDateChange(date: Date | null) {
        setSelectedDate(date);
    }

    //  document options value 
    const [selectedDocument, setSelectedDocument] = useState<string>('')
    const options = categories.filter((item) => item.documents !== null).map((item) => ({ value: item.documents, label: item.documents }))
    const selectDocument = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedDocument(option?.label ?? '');
    };
    const [addDocument, setAddDocument] = useState<string>('')      //  Add Document Input State
    const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddDocument(event.target.value);
    };
    //  marintime experience options  
    const [selectedMaritime, setSelectedMarintime] = useState<string>('')
    const experienceOptions = categories.filter((item) => item.maritime !== null).map((item) => ({ value: item.maritime, label: item.maritime }))
    const selectMarintime = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedMarintime(option?.label ?? '');
    };
    const [addMarintime, setAddMarintime] = useState<string>('')        //  Add Marintime Input State
    const handleMarintimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddMarintime(event.target.value);
    };
    //  competency certification options
    const [selectedCompetency, setSelectedCompetency] = useState<string>('')
    const certificateOptions = categories.filter((item) => item.competency !== null).map((item) => ({ value: item.competency, label: item.competency }))
    const selectCompetency = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedCompetency(option?.label ?? '');
    };
    const [addCompetency, setAddCompetency] = useState<string>('')      //  Add Competency Input State
    const handleCompetencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddCompetency(event.target.value);
    };
    //  mediacal certification options
    const [selectedMedical, setSelectedMedical] = useState<string>('')
    const medicalOptions = categories.filter((item) => item.medical !== null).map((item) => ({ value: item.medical, label: item.medical }))
    const selectMedical = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedMedical(option?.label ?? '');
    };
    const [addMedical, setAddMedical] = useState<string>('')        //  Add Medical Input State
    const handleMedicalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddMedical(event.target.value);
    };
    //  offshore certification options
    const [selectedOffshore, setSelectedOffshore] = useState<string>('')
    const offshoreOptions = categories.filter((item) => item.offshore !== null).map((item) => ({ value: item.offshore, label: item.offshore }))
    const selectOffshore = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedOffshore(option?.label ?? '');
    };
    const [addOffshore, setAddOffshore] = useState<string>('')      //  Add Offshore Input State
    const handleOffshoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddOffshore(event.target.value);
    };
    //  Submit Input Data      
    const CategoryData = {
        'documents': addDocument,
        'maritime': addMarintime,
        'competency': addCompetency,
        'medical': addMedical,
        'offshore': addOffshore
    }
    const submitCategory = () => {
        axios.post('/api/category/addcategory', CategoryData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: AxiosResponse) => {
            dispatch(addCategory(res.data.data))
        })
        setAddDocument('');
        setAddMarintime('');
        setAddCompetency('');
        setAddMedical('');
        setAddOffshore('');
    }


    const langOptions = [
        { value: 'latvian', label: 'Latvian' },
        { value: 'russian', label: 'Russian' },
        { value: 'english', label: 'English' }
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

    const avatar = localStorage.getItem('avatar');

    return (
        <div className='pt-[75px] mb-[90px]'>
            <div className='flex justify-between w-[148px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/about_project">CV Creator</Link>
            </div>
            {/* Personal Data */}

            <form>
                <div style={{ padding: "50px 58px 80px 58px" }} className='back-cv flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[67px] pl-[58px] gap-[47px] mt-[80px]'>
                    <div className='flex'>
                        <p className='text-[48px] leading-[56px] font-[600] w-[40%] text-[#116ACC] mt-[120px]'>Personal Data</p>
                        <div className='w-[60%] flex justify-end mr-[30px]'>
                            {
                                avatar ? <img className='w-[165px] h-[165px] rounded-[50%]' src={`/avatar/${avatar}`} alt="avatar" /> : <img src="/image/profile.png" />
                            }
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
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="All" onChange={selectDocument} options={options} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Documents"
                        type="text"
                        value={addDocument}
                        onChange={handleDocumentChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* Seamans's Book element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedDocument}</div>
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
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" onChange={selectMarintime} options={experienceOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Experience"
                        type="text"
                        value={addMarintime}
                        onChange={handleMarintimeChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* Job title element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedMaritime}</div>
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
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" onChange={selectCompetency} options={certificateOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Competency"
                        type="text"
                        value={addCompetency}
                        onChange={handleCompetencyChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* Onshore Cooks Certificate element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedCompetency}</div>
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
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Medical Certificate</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" onChange={selectMedical} options={medicalOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Medical Certifications"
                        type="text"
                        value={addMedical}
                        onChange={handleMedicalChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* Seafarers Medical element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedMedical}</div>
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
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" onChange={selectOffshore} options={offshoreOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Certifications"
                        type="text"
                        value={addOffshore}
                        onChange={handleOffshoreChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* BOSIET 5700 element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedOffshore}</div>
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

            {/* Sea Experience element */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[67px] pl-[58px] gap-[47px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] w-[40%] text-[#116ACC]'>Sea experience </p>
                </div>
                <div style={{ border: "1px dashed #7B61FF", padding: "58px 71px" }} className='flex flex-col rounded-[5px] w-full box-border'>
                    <div className='flex justify-end mb-[50px]'>
                        <button className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Vessel:
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
                                    Vessel Type:
                                </div>
                                <div className='w-[70%]'>
                                    <Select className='w-[300px] rounded-[10px] ml-[17px] mt-[3px]' placeholder="Please select" options={langOptions} />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Rank:
                                </div>
                                <div className='w-[70%]'>
                                    <Select className='w-[300px] rounded-[10px] ml-[17px] mt-[3px]' placeholder="Please select" options={langOptions} />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Amount of Contratcs:
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
                                    Each Contract duration (average):
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
                                    Description of Job Performed:
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
                        </div>
                    </div>
                </div>

                {/* Your Sea Experience element */}

                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Certificates STCW and Offshore</div>

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

                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='flex justify-end w-full'>
                            <button className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex w-full'>
                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Languages:
                                    </div>
                                    <div className='w-[70%]'>
                                        <Select className='w-[300px] rounded-[10px] ml-[17px] mt-[3px]' placeholder="Please select" options={langOptions} />
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[40%] label-style pt-[10px] flex justify-end'>
                                        Computer:
                                    </div>
                                    <div className='w-[60%]'>
                                        <input
                                            style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                            className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                            placeholder="Type your Computer Skills"
                                            type="text"
                                            value={name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='w-[40%] label-style pt-[10px] flex justify-end'>
                                        Additional Training and Skills:
                                    </div>
                                    <div className='w-[60%]'>
                                        <input
                                            style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                            className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                            placeholder="Type your Skills"
                                            type="text"
                                            value={name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Additional Information element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Additional Information</div>

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
