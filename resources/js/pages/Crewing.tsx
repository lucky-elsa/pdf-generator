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
    const [updateId, setUpdateId] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [fixComment, setFixComment] = useState<string>('');

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

    const handleFixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFixComment(event.target.value);
    };

    const crewings = useSelector((state: RootState) => state.crewings.crewing);

    useEffect(() => {
        axios.get('/api/crewing/getCrewing')
            .then((res: AxiosResponse) => {
                dispatch(setCrweings(res.data.data))
            })
    }, [dispatch])

    const deleteComment = (id: number) => {
        axios.post(`/api/crewing/deletecomment/${id}`)
            .then((res: AxiosResponse) => {
                dispatch(updateCrweing(res.data.data))
            })
    }

    const editComment = (id: number, comment: string) => {
        setUpdateId(id);
        setFixComment(comment);
    }

    const inputElement = (id: number) => {
        setComment('');
        setCreateId(id);
    }
    const cancelElement = () => {
        setCreateId(0);
        setUpdateId(0);
    }

    const createComment = (id: number) => {
        if (!comment) {
            alert('Type your comment');
        }
        const data = {
            "comment": comment
        }
        axios.put(`/api/crewing/comment/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res: AxiosResponse) => {
            dispatch(updateCrweing(res.data.data))
        })
        setCreateId(0)
    }

    const updateComment = (id: number) => {
        const data = {
            "fixcomment": fixComment
        }
        axios.put(`/api/crewing/fixcomment/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res: AxiosResponse) => {
            dispatch(updateCrweing(res.data.data))
        })
        setUpdateId(0);
    }

    return (
        <div className='pt-[75px] mb-[90px]'>
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
                                <th className='w-[15.5%]'>Company Name</th>
                                <th className='w-[17.5%]'>Country</th>
                                <th className='w-[20%]'>How to Apply</th>
                                <th className='w-[8%]'>Filled</th>
                                <th className='w-[28%]'>Comment</th>
                                <th className='w-[14%]'>Actions</th>
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
                                                // checked
                                                <input className='w-[16px] h-[16px]' onChange={() => handleCheckboxChange(item.id, false)} type='checkbox' checked={true} />
                                                :
                                                // unchecked
                                                <input className='w-[16px] h-[16px]' onChange={() => handleCheckboxChange(item.id, true)} type='checkbox' checked={false} />
                                        }
                                    </td>
                                    <td className='text-start'>
                                        {
                                            createId === item.id ?
                                                <input type="text"
                                                    className='pl-[13px] w-[85%] ml-auto border-[#b9b9b9] border-[1px] border-solid mr-auto h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                                    value={comment}
                                                    onChange={handleChange}
                                                />
                                                :
                                                updateId === item.id ?
                                                    <input type="text"
                                                        className='pl-[13px] w-[85%] ml-auto border-[#b9b9b9] border-[1px] border-solid mr-auto h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                                        value={fixComment}
                                                        onChange={handleFixChange}
                                                    />
                                                    :
                                                    item.comment
                                        }
                                    </td>
                                    {item.comment ?
                                        <td className='text-start flex gap-[10px]'>
                                            {updateId === item.id ?
                                                // update case
                                                <div className="flex gap-[10px]">
                                                    <button id="edit"
                                                        style={{ padding: "8px 14px", fontSize: "20px", color: "red", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                        onClick={() => updateComment(item.id)} >
                                                        <img src="/image/check.png" alt="check" />
                                                    </button>
                                                    <button id="edit"
                                                        style={{ padding: "8px 14px", fontSize: "20px", color: "red", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                        onClick={cancelElement} >X</button>
                                                </div> :
                                                // edit case
                                                <div className="flex gap-[10px]">
                                                    <button id="delete"
                                                        style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                        onClick={() => deleteComment(item.id)}>
                                                        <img src="/image/delete.png" alt="delete" />
                                                    </button>
                                                    <button id="edit"
                                                        style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                        onClick={() => editComment(item.id, item.comment)}>
                                                        <img src="/image/edit.png" alt="edit" />
                                                    </button>
                                                </div>
                                            }
                                        </td>
                                        :
                                        <td className='text-start flex gap-[10px]'>
                                            {createId === item.id ?
                                                // creat comment case
                                                <div className="flex gap-[10px]">
                                                    <button id="edit"
                                                        style={{ padding: "8px 14px", fontSize: "20px", color: "red", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                        onClick={() => createComment(item.id)} >
                                                        <img src="/image/check.png" alt="check" />
                                                    </button>
                                                    <button id="edit"
                                                        style={{ padding: "8px 14px", fontSize: "20px", color: "red", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                        onClick={cancelElement} >X</button>
                                                </div> :
                                                // create input case
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
