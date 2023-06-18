import React, { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios, { AxiosResponse } from 'axios';
import TypeHeader from "../../../../components/type";
import DefaultButton from "../../../../components/button";
import {  useAppSelector } from '../../../.././redux/hooks'
import Timepicker from "../../../../components/timepicker";
import { MO_STATUS } from "../../../../redux/type";
import { useNavigate } from "react-router-dom";

const Status = () => {
    const navigate = useNavigate();
    const index=Number(localStorage.getItem('index'));
    const data=useAppSelector((state) => state.data.value[index]);
    const [time1, settime1] = useState(data.time);
    const update = () => {
        let date = new Date();
        ; const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const body = JSON.stringify({"update":{"id":data.id,"value":selectindex,"time":time1}});
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
    const [selectindex,setSelect]=useState(data.value);
    return (
        <div >
            <p className="text-4xl text-mainColor py-8 font-black text-center pb-2">{"記録を編集する"}</p>
            <p className="text-base text-mainColor pt-2 pb-4 font-light text-center">{"朝のお口の状態を編集しましょう"}</p>
            <TypeHeader text="朝のお口の状態"/>
            <div className="px-8 pt-4" style={{textAlign:"center"}}>
                <p className="text-sm text-mainColor text-left pb-2">今朝のお口の状態はいかがでしたか？</p>
                <div className="c-mouthStatus__container u-m-auto onIndexMS">
                        <label className="c-mouthStatus-label">
                            <select id="resizing_select" value={selectindex!} className="flex items-center justify-center c-mouthStatus__container-status c-timeSelect__timeInput bg-white text-mainColor text-[26px] font-bold w-full rounded-lg border border-mainColor    outline-0 text-center object-center"
                                onChange={(e) => setSelect(e.target.value)}>
                                <option className="c-mouthStatus-choices" value={1}>{MO_STATUS[0]}</option>
                                <option className="c-mouthStatus-choices" value={2}>{MO_STATUS[1]}</option>
                                <option className="c-mouthStatus-choices" value={3}>{MO_STATUS[2]}</option>
                                <option className="c-mouthStatus-choices" value={4}> {MO_STATUS[3]}</option>
                                <option className="c-mouthStatus-choices" value={5}> {MO_STATUS[4]}</option>
                                <option className="c-mouthStatus-choices" value={6}> {MO_STATUS[5]}</option>
                            </select>
                            <select id="width_tmp_select w-0" style={{display:"none"}}>
                                <option id="width_tmp_option"></option>
                            </select>
                        </label>
                    </div>
            </div>
            <DefaultButton text="記録をする" buttonClick={update}  />
        </div>
    );
};

export default Status;
