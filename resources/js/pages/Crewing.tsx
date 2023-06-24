import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Select from 'react-select';
import { useSelector } from "react-redux";
import './style.css'
import Pagination from '@mui/material/Pagination';
import { RootState } from '../redux/store';
import { setCrweings } from '../redux/reducers/crewingslice'
import { useAppDispatch } from '../redux/hooks'
import axios, { AxiosResponse } from "axios";

export default function Crewing() {
    const dispatch = useAppDispatch();

    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' }
    ];

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    const crewings = useSelector((state: RootState) => state.crewings.crewing);

    useEffect(() => {
        axios.get('/api/crewing/getCrewing')
            .then((res: AxiosResponse) => {
                dispatch(setCrweings(res.data.data))
            })
    }, [])

    const deleteCrewing = (id: number) => {

    }

    return (
        <div className='pt-[75px] mb-[90px] '>
            <div className='flex justify-between w-[183px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/">Crewings Board</Link>
            </div>

            <div style={{ padding: "48px 58px" }} className='back-contect flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>

                <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Crewings Board Data</p>
                <div className='mt-[44px] flex flex-col gap-[23px]'>
                    <div className='flex justify-end'>
                        <label className='mt-[7px] mr-[18px]'>Filter</label>
                        <Select className='w-[300px] mr-[56px] rounded-[10px]' placeholder="All" options={options} />
                    </div>
                    {/* Crewing Table element */}
                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[14%]'>Company Name</th>
                                <th className='w-[17.5%]'>Country</th>
                                <th className='w-[20%]'>How to Apply</th>
                                <th className='w-[8%]'>Filled</th>
                                <th className='w-[32%]'>Comment</th>
                                <th className='w-[8.5%]'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {crewings.map((item, i) => (
                                <tr key={i}>
                                    <td className='text-start'>{item.company}</td>
                                    <td className='text-start'>{item.country}</td>
                                    <td className='text-start'>{item.how}</td>
                                    <td className='pl-[18px]'>
                                        {
                                            item.filled ?
                                                <input className='w-[16px] h-[16px]' onChange={handleCheckboxChange} type='checkbox' checked={true} />
                                                :
                                                <input className='w-[16px] h-[16px]' onChange={handleCheckboxChange} type='checkbox' checked={false} />
                                        }
                                    </td>
                                    <td className='text-start'>{item.comment}</td>
                                    <td className='text-start flex gap-[10px]'>
                                        <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                            <img src="/image/delete.png" alt="delete" />
                                        </button>
                                        <button id="edit"
                                            style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                            onClick={() => deleteCrewing(item.id)}
                                        >
                                            <img src="/image/edit.png" alt="edit" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/plus.png" alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='mt-[49px] flex justify-center'>
                <Link className='rounded-[7px] pt-[16px] pb-[16px] pl-[24px] pr-[24px] text-[#fff] font-[500] text-[16px] leading-[20px]  bg-[#116ACC]' to="/login">Login or Register to Load More</Link>
            </div>

            <div className="relative top-[37px] flex justify-center">
                <Pagination count={10} color="primary" />
            </div>
        </div>
    )
}
