import React, { useState , useEffect} from "react";
import Button from "../../../../components/button";
import {Route,Routes,NavLink,Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import {  useAppDispatch,useAppSelector } from '../../../.././redux/hooks'
import AdminSmButton from "../../../../components/admindefaultbutton";
import { changeusers } from "../../../../redux/reducers/userslice";
import {  changeByAmount } from '../../../.././redux/reducers/indexslice'

const PatientList = () => {
    const dispatch = useAppDispatch();
    const data=useAppSelector((state) => state.user.value);
    const [ticketid,setTicketid]=useState("");
    const [name,setName]=useState("");
    const searchUsers = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const body = JSON.stringify({ "name": name,"ticketid":ticketid });
        try {
            axios.post(`/api/admin/searchusers`,body, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(changeusers(response.data["data"][0]));
                } else {
                }
            });
        }
        catch (err) {

        }
    }
    return (
        <div className="mx-[230px] mt-[20px] min-h-screen h-full bg-white overflow-hidden">
            <div className="flex flex-row items-center pt-[39px] pl-[94px]">
                <p className="text-[24px] font-bold">
                    患者一覧
                </p>
                <NavLink to="register" className="pl-[67px]">
                   <AdminSmButton text="新規登録" buttonClick={()=>{}} px={13}/>
                </NavLink>
            </div>
            <div className="pl-[94px] pr-[82px] flex items-end flex-basis justify-between mt-[14px] mb-[58px]">
                <div className="basis-[37.5%]">
                    <p className="text-[16px] pb-[11px]">
                         診察券番号
                    </p>
                    <input className="tracking-[.3em] rounded-xl text-base  border border-adminborderColor focus:outline-none focus:border-black bg-white px-4 py-3 border-cyan-400 font-semibold w-full" value={ticketid} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setTicketid(e.target.value);}}/>
                </div>
                <div className="basis-[37.5%]">
                    <p className="text-[16px] pb-[11px]">
                        氏名
                    </p>
                    <input className="tracking-[.3em] rounded-xl text-base  border border-adminborderColor focus:outline-none focus:border-black bg-white px-4 py-3 border-cyan-400 font-semibold w-full" value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setName(e.target.value);}}/>
                </div>
                <div className="basis-[12.5] pb-[5px]">
                     <AdminSmButton text="検索" buttonClick={searchUsers} px={20}/>
                </div>
            </div>
            <div className="px-[62px] table-auto">
                <table className=" w-full">
                    <tbody>
                        <tr className="text-left bg-[#F0F0F0] ">
                            <th className="pl-[22px] py-[12px]">
                                診察券番号
                            </th>
                            <th className=" py-[12px]">
                                氏名
                            </th>
                            <th className=" py-[12px]">
                                患者メモ
                            </th>
                            <th className=" py-[12px]"></th>
                        </tr>
                        {
                             data && data.map((v,index) =>
                             <tr key={index} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor">
                                <td className="pl-[22px] tracking-[.45em]">{v.ticketid}</td>
                                <td>{v.name}</td>
                                <td >
                                    <p className="py-[10px]">{v.info}</p>
                                </td>
                                <td className="pt-[22px] pb-[9px] text-right">
                                    <NavLink to="patientedit">
                                        <AdminSmButton text="詳細" buttonClick={()=>{dispatch(changeByAmount(index));}} px={20} />
                                    </NavLink>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientList;
