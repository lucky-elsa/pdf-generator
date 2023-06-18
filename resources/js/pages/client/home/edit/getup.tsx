import React, { useEffect, useState } from "react";
import TypeHeader from "../../../../components/type";
import DefaultButton from "../../../../components/button";
import Timepicker from "../../../../components/timepicker";
import axios, { AxiosResponse } from 'axios';
import {  useAppDispatch,useAppSelector } from '../../../.././redux/hooks'
import { useNavigate } from "react-router-dom";
//import {  changedataindex } from '../../../.././redux/reducers/dataslice'

const GetUp = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const index=Number(localStorage.getItem('index'));
    const data=useAppSelector((state) => state.data.value[index]);
    const [time1, settime1] = useState('');
    useEffect(() => {
        if(data){

            settime1(data.time!);
        }
    }, [data])
    const update = () => {
        let date = new Date();
        ; const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const body = JSON.stringify({"update":{"id":data.id,"time":time1}});
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
    return (
        !data?<></>:
        <div >
            <p className="text-3xl text-mainColor py-4 font-black text-center pb-2">{"記録を編集する"}</p>
            <p className="text-base text-mainColor pt-2 font-light text-center pb-2">{"起床時間を編集しましょう"}</p>
            <TypeHeader text="起床"/>
            <div className="px-8 pt-4">
                <p className="font-bold text-mainColor px-8 mb-4 text-xs">起床時間</p>
                <input style={{WebkitAppearance: "none"}} className="flex items-center justify-center focus:outline-none focus:border-mainColor tracking-[.3em] text-center rounded-lg border border-mainColor text-[26px] text-mainColor font-bold  px-2 w-full mt-4 bg-white" type="time"  value={time1} onChange={(ev) => {settime1(ev.target.value);}} />
            </div>
            <DefaultButton text="記録をする" buttonClick={update}  />
        </div>
    );
};

export default GetUp;
