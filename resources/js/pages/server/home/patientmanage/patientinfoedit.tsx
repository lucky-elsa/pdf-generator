import React, { useState, useEffect } from "react";
import { Route, Routes, NavLink, Link, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import AdminSmButton from "../../../../components/admindefaultbutton";
import { useAppDispatch, useAppSelector } from '../../../.././redux/hooks'

const PatientInfoEdit = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const index=Number(localStorage.getItem('index'));
    const selectuser = useAppSelector((state) => state.user.value)[index];
    const [name, setUserName] = useState('');
    const [ticketid, setTicketId] = useState('');
    useEffect(() => {
        if(selectuser){
            setUserName(selectuser.name!);
            setTicketId(selectuser.ticketid!);
        }
    }, [selectuser])
    const resetName = () => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({"id":selectuser.id, "name": name, "ticketid": ticketid });
        try {
            axios.post('/api/admin/clientresetname', body, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    navigate('/admin/main/patientmamage/');
                } else {
                    setMessage(response.data["message"]);
                }
            });
        }
        catch (err) {

        }
    }
    return (
        !selectuser?<div></div>:
        <div className="mx-[230px] mt-[20px] min-h-screen h-full bg-white">
            <div className="flex flex-row items-center pt-[39px] pl-[94px]">
                <p className="text-[24px] font-bold">
                    患者情報編集
                </p>
            </div>
            <div className="flex items-center justify-center  ml-[20px]">
                <p className="text-[20px] font-bold pr-[56px]">
                    患者氏名
                </p>
                <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUserName(e.target.value); }} className="w-[382px] tracking-[.3em] rounded-xl text-base  border border-adminborderColor focus:outline-none focus:border-black bg-white px-4 py-3 border-cyan-400 font-semibold" />
            </div>
            <div className="flex items-center pt-[30px] justify-center">
                <p className="text-[20px] font-bold pr-[56px]">
                    診察券番号
                </p>
                <input value={ticketid} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTicketId(e.target.value); }} className="w-[382px] tracking-[.3em] rounded-xl text-base  border border-adminborderColor focus:outline-none focus:border-black bg-white px-4 py-3 border-cyan-400 font-semibold" />
            </div>
            {<p className="text-xl text-redColor flex justify-center">{message}</p>}
            <div className="pt-[140px] flex justify-center">
                <AdminSmButton text="更新" buttonClick={resetName} px={20} />
            </div>
        </div>
    );
};

export default PatientInfoEdit;
