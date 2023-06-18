import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import './style.css'

export default function Crewing() {
    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' }
    ];

    return (
        <div className='pt-[75px] mb-[90px]'>
            <div className='flex justify-between w-[183px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/about_project">Crewings Board</Link>
            </div>

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Crewings Board Data</p>
                <div className='mt-[44px] flex flex-col gap-[23px]'>
                    <div className='flex justify-end'>
                        <label className='mt-[7px] mr-[18px]'>Filter</label>
                        <Select className='w-[300px] mr-[56px] rounded-[10px]' placeholder="All" options={options} />
                    </div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px]'>
                            <tr className='rounded-[15px]'>
                                <th className='w-[14%]'>Company Name</th>
                                <th className='w-[17.5%]'>Country</th>
                                <th className='w-[20%]'>How to Apply</th>
                                <th className='w-[8%]'>Filled</th>
                                <th className='w-[32%]'>Comment</th>
                                <th className='w-[8.5%]'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' checked />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' checked />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' checked />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' checked />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/plus.png" alt="delete" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' checked />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' checked />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/plus.png" alt="delete" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start'>Atlas International</td>
                                <td className='text-start'>Norway, Germany, Australia</td>
                                <td className='text-start'>Send CV+Motivation via WebForm</td>
                                <td className='pl-[18px]'>
                                    <input className='w-[16px] h-[16px]' type='checkbox' checked />
                                </td>
                                <td className='text-start'>Test comment goes here / tut komment</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
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
