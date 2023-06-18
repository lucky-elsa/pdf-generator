import React, { useEffect, useState } from "react";
import DefaultButton from "../../../../components/button";
import Timepicker from "../../../../components/timepicker";
import TypeHeader from "../../../../components/type";
import axios, { AxiosResponse } from 'axios';
import {useAppSelector } from '../../../.././redux/hooks'
import { useNavigate } from "react-router-dom";
const BedTime = () => {
    const navigate = useNavigate();
    const index=Number(localStorage.getItem('index'));
    const date =localStorage.getItem('date')?new Date(localStorage.getItem('date')!):new Date();
    const data=useAppSelector((state) => state.data.value[index]);
    const [time1, settime1] = useState('');
    const [tabindex, setTabIndex] = useState(2);
    const update = () => {
        ; const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const body = JSON.stringify({"update":{"id":data.id,"time":time1,"date": date.getFullYear() + ":" + (date.getMonth() + 1) + ":" + (date.getDate()+tabindex-2),}});
        try {
            axios.post('/api/client/update', body, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    navigate('/client/home/edit/');
                } else {

                }
            });
        }
        catch (err) {

        }
    }
    useEffect(() => {
        if(data)
          settime1(data.time);
    },[data])
    function getDate(next:boolean) {
        let newDate = date;
        let month = newDate.getMonth() + 1;
        let day = newDate.getDay();
        return next?`${month}月${newDate.getDate()-1}日`:`${month}月${newDate.getDate()}日`;
    }
    return (
        !data?<></>:
        <div >
            <p className="text-4xl text-mainColor py-8 font-black text-center pb-2">{"記録を編集する"}</p>
            <p className="text-base text-mainColor pt-2font-light text-center pb-2">{"就寝時間を編集しましょう"}</p>
            <TypeHeader text="就寝"/>
            <p className="text-sm text-mainColor font-bold text-left pb-2 mt-8">就寝時間</p>
            <div className="mx-4">
                <ul className="flex flex-row text-[22px] font-bold text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li className="basis-1/2  " role="presentation">
                        <button onClick={() => { setTabIndex(1) }} className={"shadow-[0px_-1px_4px_4px_rgba(0,0,0,0.03)] rounded-l-2xl py-3 w-full inline-block px-4   font-black " + (tabindex == 1 ? "bg-btnbgColor text-white" : "text-mainColor bg-white")} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{getDate(true)}</button>
                    </li>
                    <li className="basis-1/2 " role="presentation">
                        <button onClick={() => { setTabIndex(2) }} className={"shadow-[0px_-1px_4px_4px_rgba(0,0,0,0.03)] rounded-r-2xl py-3 w-full inline-block px-4  font-black " + (tabindex == 2 ? "bg-btnbgColor text-white" : "text-mainColor bg-white")} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">{getDate(false)}</button>
                    </li>
                </ul>
            </div>
            <div className="px-8 pt-4">
            <input style={{WebkitAppearance: "none"}} className="flex items-center justify-center focus:outline-none focus:border-mainColor tracking-[.3em] text-center rounded-lg border border-mainColor text-[26px] text-mainColor font-bold  px-2 w-full mt-4 bg-white" type="time"  value={time1} onChange={(ev) => {settime1(ev.target.value);}} />
            </div>
            <DefaultButton text="記録をする" buttonClick={update}  />
        </div>
    );
};

export default BedTime;
