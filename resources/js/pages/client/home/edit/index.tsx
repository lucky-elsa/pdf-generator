import React, { useEffect, useState } from "react";
import {Route,Routes,NavLink,useLocation, Navigate} from 'react-router-dom';
import { BiArrowBack,BiCalendar} from "react-icons/bi";
import Main from "./main";
import Calender from "./calender";
import GetUp from "./getup";
import Status from "./status";
import Diary from "./diary";
import SetMeal from "./setmeal";
import BedTime from "./bedtime";
import Adder from "./add";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import axios, { AxiosResponse } from "axios";
import {  changedata,changedate } from '../../../.././redux/reducers/dataslice'

const Editer = () => {
    const dispatch = useAppDispatch();
    const name=useAppSelector((state) => state.authenticater.name);
    const date1=useAppSelector((state) => state.data.date);
    const [flag, setFlag]=useState(false);
    const location = useLocation();
    const path=location.pathname.split("/");
    const date =localStorage.getItem('date')?new Date(localStorage.getItem('date')!):date1;
    const loaddata = () => {
        let datestr=date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            axios.get(`/api/client/loaddata?date=${datestr}`, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(changedata(response.data["data"][0]));
                } else {
                }
            });
        }
        catch (err) {

        }
    }
    useEffect(() => {
        console.log(date);
        loaddata();
    },[date1])
    useEffect(() => {
        if(path.length>4&&path[4]!=""){
            setFlag(true);
        }else{
            setFlag(false);
        }
    }, [location])
    return (
        <div>
            <div className="flex justify-between pt-4 pb-2 px-4">
                {/* <NavLink to={path[4]=="add"?"calender":""} className={flag?"":"invisible"}> */}
                <NavLink to={""} className={flag?"":"invisible"}>
                    <div className="bg-mainColor text-white rounded-md w-[1.875rem] h-[1.875rem] p-[3px]">
                        <img src={'/images/back.png'} className="w-full h-full"/>
                    </div>
                </NavLink>
                <p className="text-base text-mainColor  font-semibold text-center">{name+" さん"}</p>
                <NavLink to="calender" className={flag?"invisible":""}>
                    <div className="bg-mainColor text-white rounded-md w-[1.875rem] h-[1.875rem] p-[3px]">
                        <img src={'/images/calender.png'} className="w-full h-full"/>
                    </div>
                </NavLink>
            </div>
            <div className="text-xl bg-btnbgColor h-0.5"></div>
            <Routes >
                <Route  path="/" element={ <Main />}/>
                <Route  path="/add/*" element={ <Adder />}/>
                <Route  path="/calender" element={ <Calender />}/>
                <Route  path="/getup" element={ <GetUp />}/>
                <Route  path="/status" element={ <Status />}/>
                <Route  path="/diary" element={ <Diary />}/>
                <Route  path="/meal" element={ <SetMeal />}/>
                <Route  path="/bedtime" element={ <BedTime />}/>
            </Routes>
        </div>
    );
};
export default Editer;
