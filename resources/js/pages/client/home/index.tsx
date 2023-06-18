import React, { useState, useEffect } from "react";
import { Route, Routes, NavLink, useLocation } from 'react-router-dom';
import { BiLayout, BiPencil, BiEnvelope } from "react-icons/bi";
import Register from "./register";
import Editer from "./edit";
import Notification from './notification'
import axios, { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { changedata,changepage,changecount } from "../../../redux/reducers/notificationslice";
import FooterComponent from "../../../components/footercomponent";

const Home = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const path = location.pathname.split("/");
    useEffect(() => {
        if (path[3] == 'edit') {
            setSelect(2);
        } else if (path[3] == 'email') {
            setSelect(3);
        }
    }, [location])
    const [selectindex, setSelect] = useState(1);
    function SetIndex(val: number) {
        setSelect(val);
    }
    const notification = () => {
        let date = new Date();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ "time": date.toTimeString().split(' ')[0].substring(0, 6) + "00", "date": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() });
        try {
            axios.post('/api/client/notification', body, config).then((response: AxiosResponse) => {
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
    }, [selectindex])
    return (
        <div >
            <div className="pb-20">
                <Routes >
                    <Route path="/register/*" element={<Register />} />
                    <Route path="/edit/*" element={<Editer />} />
                    <Route path="/email/*" element={<Notification />} />
                </Routes>
            </div>
            <FooterComponent selectindex={selectindex} SetIndex={(index)=>{SetIndex(index)}} />

        </div>
    );
};

export default Home;
