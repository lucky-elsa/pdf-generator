import React, { useState , useEffect} from "react";
import {Route,Routes,NavLink,Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import AdminSmButton from "../../../../components/admindefaultbutton";
import {  useAppDispatch,useAppSelector } from '../../../.././redux/hooks';
import {  changeByAmount } from '../../../.././redux/reducers/indexslice';
import { changeusers } from "../../../../redux/reducers/userslice";


const Register = () => {
    const dispatch = useAppDispatch();
    const data=useAppSelector((state) => state.user.value);
    const [name,setUserName]=useState("");
    const [ticketid,setTicketId]=useState("");
    const [issuccess,setIsSuccess]=useState(false);
    const [message,setMessage]=useState("");
    const [id,setId]=useState(0);
    const [password,setPass]=useState("");
    const loadusers = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            axios.get(`/api/admin/loadusers`, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(changeusers(response.data["data"][0]));
                } else {
                }
            });
        }
        catch (err) {

        }
    }
    const register=()=>{

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body=JSON.stringify({"name":name,"ticketid":ticketid});
        try{
            axios.post('/api/admin/registerclient',body,config).then((response:AxiosResponse)=>{
                if(response.data["success"]==true){
                    setIsSuccess(true);
                    setId(response.data["id"]);
                    setPass(response.data["password"]);
                    loadusers();

                }else{
                    setMessage(response.data["message"]);
                }
            });
        }
        catch(err){

        }
    }
    return (
        !data?<div></div>:
        <div className="mx-[230px] mt-[20px] min-h-screen h-full bg-white">
            {issuccess&&<div>
                <div className="flex flex-row items-center pt-[39px] pl-[94px] pb-[71px]">
                    <p className="text-[24px] font-bold">
                        新規患者登録されました
                    </p>
                </div>
                    <table className="flex justify-center">
                        <tbody>
                            <tr>
                                <td className="pb-[54px] text-right">
                                    <p className="text-[20px] font-bold pr-[56px]">
                                        患者氏名
                                    </p>
                                </td>
                                <td className="pb-[54px]">
                                    <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{name}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="pb-[54px] text-right">
                                    <p className="text-[20px] font-bold pr-[56px] ">
                                        ID
                                    </p>
                                </td>
                                <td className="pb-[54px]">
                                    <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{id}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    <p className="text-[20px] font-bold pr-[56px] ">
                                        パスワード
                                    </p>
                                </td>
                                <td>
                                    <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{password}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="pt-[140px] flex justify-center">
                        <NavLink to="../patientedit">
                            <AdminSmButton text="患者情報へ" buttonClick={()=>{dispatch(changeByAmount(data.length-1));}} px={20}/>
                        </NavLink>
                    </div>
                </div>}
            {!issuccess&&<>
                <div className="flex flex-row items-center pt-[39px] pl-[94px]">
                    <p className="text-[24px] font-bold">
                        新規患者登録
                    </p>
                </div>
                <div className="flex items-center justify-center ml-[20px]">
                    <p className="text-[20px] font-bold pr-[56px]">
                          患者氏名
                    </p>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUserName(e.target.value);}} className="w-[382px] tracking-[.3em] rounded-xl text-base  border border-adminborderColor focus:outline-none focus:border-black bg-white px-4 py-3 border-cyan-400 font-semibold" />
                </div>
                <div className="flex items-center pt-[30px] justify-center">
                    <p className="text-[20px] font-bold pr-[56px]">
                    診察券番号
                    </p>
                    <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setTicketId(e.target.value);}} className="w-[382px] tracking-[.3em] rounded-xl text-base  border border-adminborderColor focus:outline-none focus:border-black bg-white px-4 py-3 border-cyan-400 font-semibold" />
                </div>
                {<p className="text-xl text-redColor flex justify-center">{message}</p>}
                <div className="pt-[140px] flex justify-center">
                     <AdminSmButton text="患者登録" buttonClick={register} px={20}/>
                </div>
            </>
            }
        </div>
    );
};

export default Register;
