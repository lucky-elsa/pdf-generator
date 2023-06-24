import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Select from 'react-select';
import { useSelector } from "react-redux";
import './style.css'
import Pagination from '@mui/material/Pagination';
import { RootState } from '../redux/store';
import { setCrweings, updateCrweing } from '../redux/reducers/crewingslice'
import { useAppDispatch } from '../redux/hooks'
import axios, { AxiosResponse } from "axios";
import { create } from "@mui/material/styles/createTransitions";
import { red } from "@mui/material/colors";

export default function Crewing() {
    const dispatch = useAppDispatch();

    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' }
    ];

    const [createId, setCreateId] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    const handleCheckboxChange = async (id: number, filled: boolean) => {
        const data = {
            "filled": filled
        }

        axios.put(`/api/crewing/filled/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res: AxiosResponse) => {
            dispatch(updateCrweing(res.data.data))
        })
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const crewings = useSelector((state: RootState) => state.crewings.crewing);

    useEffect(() => {
        axios.get('/api/crewing/getCrewing')
            .then((res: AxiosResponse) => {
                dispatch(setCrweings(res.data.data))
            })
    }, [dispatch])

    const deleteCrewing = (id: number) => {

    }

    const updateCrewing = (id: number) => {

    }

    const inputElement = (id: number) => {
        setCreateId(id);
    }
    const cancelElement = () => {
        setCreateId(0);
    }

    const updateComment = () => {
        alert(comment);
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
                                            item.filled
                                                ?
                                                <input className='w-[16px] h-[16px]' onChange={() => handleCheckboxChange(item.id, false)} type='checkbox' checked={true} />
                                                :
                                                <input className='w-[16px] h-[16px]' onChange={() => handleCheckboxChange(item.id, true)} type='checkbox' checked={false} />
                                        }
                                    </td>
                                    <td className='text-start'>
                                        {
                                            createId === item.id ?
                                                <form onSubmit={updateComment}>
                                                    <input type="text"
                                                        className='pl-[10px] w-[85%] ml-auto border-[#b9b9b9] border-[1px] border-solid mr-auto h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                                        value={comment}
                                                        onChange={handleChange}
                                                    />
                                                </form> : item.comment
                                        }
                                    </td>
                                    {item.comment ?
                                        <td className='text-start flex gap-[10px]'>
                                            <button id="delete"
                                                style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                onClick={() => deleteCrewing(item.id)}>
                                                <img src="/image/delete.png" alt="delete" />
                                            </button>
                                            <button id="edit"
                                                style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                onClick={() => updateCrewing(item.id)}>
                                                <img src="/image/edit.png" alt="edit" />
                                            </button>
                                        </td>
                                        :
                                        <td className='text-start flex gap-[10px]'>
                                            {createId === item.id ?
                                                <button id="edit"
                                                    style={{ padding: "8px 14px", fontSize: "20px", color: "red", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                    onClick={cancelElement} >X</button> :
                                                <button id="edit"
                                                    style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                    onClick={() => inputElement(item.id)} >
                                                    <img src="/image/plus.png" alt="delete" />
                                                </button>
                                            }
                                        </td>
                                    }
                                </tr>
                            ))}
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
