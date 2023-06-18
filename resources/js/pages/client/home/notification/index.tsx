import React, { useEffect, useState } from "react";
import {Route,Routes,NavLink,useLocation, Navigate} from 'react-router-dom';
import { BiArrowBack,BiCalendar} from "react-icons/bi";
import NotificationList from "./notificationlist";
import BreshNotify from "./breshnotify"
import SelfCheck from "./selfcheck";
import Record from "./record";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changecount, changedata, changepage } from "../../../../redux/reducers/notificationslice";
import VideoNotify from "./videonotification";
import axios, { AxiosResponse } from "axios";

const Notification = () => {
    const index=!Number(localStorage.getItem('tabindex'))?1:Number(localStorage.getItem('tabindex'));
    const dispatch = useAppDispatch();
    const [tabindex, setTab] = useState(Number(index));
    const setLocal=(index:number)=>{
        localStorage.setItem('tabindex',index.toString());
        setTab(index);
    }
    const notification = () => {
        let date = new Date();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            axios.get('/api/client/onlynotification?page='+tabindex, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(changecount(response.data["count"][0]));
                    dispatch(changedata(response.data["value"][0]["data"]));
                    dispatch(changepage(response.data["value"][0]["last_page"]));

                } else {
                    return false;
                }
            });
        }
        catch (err) {
            return false;
        }
    }
    useEffect(() => {
        notification();
    }, [tabindex])
   return (
    <Routes >
        <Route  path="/" element={ <NotificationList buttonClick={setLocal} index={tabindex} />}/>
        <Route  path="/breshnotify" element={ <BreshNotify />}/>
        <Route  path="/selfcheck" element={ <SelfCheck />}/>
        <Route  path="/record" element={ <Record />}/>
        <Route  path="/video" element={ <VideoNotify />}/>
    </Routes>
   )
};
export default Notification;
