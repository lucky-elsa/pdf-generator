import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import axios, { AxiosResponse } from 'axios';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';

import { setDocument, createDocument, updateDocument, deleteDocument } from '../redux/reducers/documentslice';
import { setMarintime, createMarintime, updateMarintime, deleteMarintime } from '../redux/reducers/marintimeslice';
import { setCompetency, createCompetency, updateCompetency, deleteCompetency } from '../redux/reducers/competencyslice';
import { setMedical, createMedical, updateMedical, deleteMedical } from '../redux/reducers/medicalslice';
import { setOffshore, createOffshore, updateOffshore, deleteOffshore } from '../redux/reducers/offshoreslice';
import { setSea, createSea, updateSea, deleteSea } from '../redux/reducers/seaslice';
import { setInfomation, createInfomation, updateInfomation, deleteInfomation } from '../redux/reducers/informationslice';
import { setPersonal, createPersonal, updatePersonal } from '../redux/reducers/personalslice';
import Client from './client';

export default function Preview() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        axios.get('/api/controller/getDocuments')
            .then((res: AxiosResponse) => {
                dispatch(setDocument(res.data.data))
            })
        axios.get('/api/controller/getMarintime')
            .then((res: AxiosResponse) => {
                dispatch(setMarintime(res.data.data))
            })
        axios.get('/api/controller/getCompetency')
            .then((res: AxiosResponse) => {
                dispatch(setCompetency(res.data.data))
            })
        axios.get('/api/controller/getMedical')
            .then((res: AxiosResponse) => {
                dispatch(setMedical(res.data.data))
            })
        axios.get('/api/controller/getOffshore')
            .then((res: AxiosResponse) => {
                dispatch(setOffshore(res.data.data))
            })
        axios.get('/api/controller/getSea')
            .then((res: AxiosResponse) => {
                dispatch(setSea(res.data.data))
            })
        axios.get('/api/controller/getInfo')
            .then((res: AxiosResponse) => {
                dispatch(setInfomation(res.data.data))
            })
        axios.get('/api/controller/getPersonal')
            .then((res: AxiosResponse) => {
                dispatch(setPersonal(res.data.data))
            })
    }, [dispatch])

    const document = useSelector((state: RootState) => state.documents.document);
    const marintime = useSelector((state: RootState) => state.marintimes.marintime);
    const competency = useSelector((state: RootState) => state.competencies.competency)
    const medical = useSelector((state: RootState) => state.medicals.medical);
    const offshore = useSelector((state: RootState) => state.offshores.offshore);
    const sea = useSelector((state: RootState) => state.seas.sea);
    const information = useSelector((state: RootState) => state.informations.information);
    const personal = useSelector((state: RootState) => state.personals.personal)

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
                                <div className='w-[70%] font-[500] text-[32px] leading-[36px] mt-[-2px] ml-[45px] text-[#4B5563]'>
                                    <button className='rounded-[7px] h-[52px] pl-[24px] pr-[24px] font-[500] text-[16px] leading-[20px] text-[#fff] bg-[#116ACC]'>CREATE PDF</button>
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
                                <th className='w-[24%]'>Document Type</th>
                                <th className='w-[20.7%]'>Country</th>
                                <th className='w-[20.7%]'>Number</th>
                                <th className='w-[20.6%]'>Issue Date</th>
                                <th className='w-[18%]'>Expiration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                document.map((item, i) => {
                                    if (item.userId === localStorage.getItem('userId')) {
                                        return (
                                            <tr key={i}>
                                                <td className='text-start'>{item.document_type}</td>
                                                <td className='text-start'>{item.country}</td>
                                                <td className='text-start'>{item.number}</td>
                                                <td className='text-start'>{item.issue_date}</td>
                                                <td className='text-start'>{item.expiration_date}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
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
                                <th className='w-[25%]'>Job title</th>
                                <th className='w-[19.7%]'>Years</th>
                                <th className='w-[19.7%]'>Type of vessels</th>
                                <th className='w-[19.6%]'>Clients</th>
                                <th className='w-[16%]'>Crewing's Employers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                marintime.map((item, i) => {
                                    if (item.userId === localStorage.getItem('userId')) {
                                        return (
                                            <tr>
                                                <td className='text-start'>{item.job_title}</td>
                                                <td className='text-start'>{item.years}</td>
                                                <td className='text-start'>{item.vessel_type}</td>
                                                <td className='text-start'>{item.client}</td>
                                                <td className='text-start'>{item.employers}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
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
                                <th className='w-[25.5%]'>Name</th>
                                <th className='w-[25.5%]'>Number</th>
                                <th className='w-[37%]'>Issue Date</th>
                                <th className='w-[12%]'>Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-start'>Food Safety and HACPP </td>
                                <td className='text-start'>HACPP122324324325</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
                            </tr>
                            <tr>
                                <td className='text-start'>Food Safety and HACPP </td>
                                <td className='text-start'>HACPP122324324325</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
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
                                <th className='w-[25.5%]'>Name</th>
                                <th className='w-[25.5%]'>Number</th>
                                <th className='w-[37%]'>Issue Date</th>
                                <th className='w-[12%]'>Expiry Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>Seafarers Medical</td>
                                <td className='text-start'>HACPP122324324325</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
                            </tr>
                            <tr>
                                <td className='text-start'>OGUK</td>
                                <td className='text-start'>24214325436567</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
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
                                <th className='w-[25.5%]'>Name</th>
                                <th className='w-[25.5%]'>Number</th>
                                <th className='w-[37%]'>Issue Date</th>
                                <th className='w-[12%]'>Expiry Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>Basic Safety Training</td>
                                <td className='text-start'>HACPP122324324325</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
                            </tr>
                            <tr>
                                <td className='text-start'>CUSTOM</td>
                                <td className='text-start'>24214325436567</td>
                                <td className='text-start'>20.05.2020</td>
                                <td className='text-start'>20.05.2025</td>
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
                                <th className='w-[16%]'>Vessel</th>
                                <th className='w-[16%]'>Vessel Type</th>
                                <th className='w-[14%]'>Rank</th>
                                <th className='w-[16%]'>Contracts</th>
                                <th className='w-[20%]'>Contract Duration</th>
                                <th className='w-[18%]'>Description</th>
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
                            </tr>
                            <tr>
                                <td className='text-start'>Vessel Name</td>
                                <td className='text-start'>Vessel Type</td>
                                <td className='text-start'>Captain</td>
                                <td className='text-start'>20</td>
                                <td className='text-start'>6 months</td>
                                <td className='text-start'>I was the main on the board</td>
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
                                <th className='w-[37.5%]'>Languages</th>
                                <th className='w-[37.5%]'>Computer</th>
                                <th className='w-[25%]'>Additional trainings and skills</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>LV/ENG/RUS</td>
                                <td className='text-start'>Word/Excel/Explorer</td>
                                <td className='text-start'>I am very trained </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='flex w-full mt-[60px] pt-[96x]'>
                <div className='flex justify-start w-[50%]'>
                    <Link className='ml-[120px] pt-[14px] pl-[24px] bg-[#116ACC] rounded-[7px] w-[90px] h-[52px] text-[16px] font-[500] text-[#fff]' to="/cv">BACK</Link>
                </div>
                <div className="flex justify-end w-[50%]">
                    <button className='mr-[120px] bg-[#116ACC] rounded-[7px] w-[117px] h-[52px] text-[16px] font-[500] text-[#fff]' type='button'>SAVE</button>
                </div>
            </div>
        </div>
    )
}