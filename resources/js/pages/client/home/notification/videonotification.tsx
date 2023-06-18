import React, { ChangeEvent, useEffect, useState } from "react";
import { Route, Routes, NavLink, useLocation, Navigate } from 'react-router-dom';
import { BiArrowBack, BiCalendar } from "react-icons/bi";
import DefaultButton from "../../../../components/button";
import TypeHeader from "../../../../components/type";
import { useAppSelector } from "../../../../redux/hooks";
import axios, { AxiosResponse } from "axios";

const VideoNotify = () => {
    const index=Number(localStorage.getItem('index'));
    const data = useAppSelector((state) => state.notification.value)[index];
    const name=useAppSelector((state) => state.authenticater.name);
    return (!data?<div></div>:
        <div className="mx-[3px] mb-[106px]">
            <div className="flex justify-center items-center pt-4 pb-2 px-4 relatvice">
                <p className="text-base text-mainColor  font-semibold text-center">{name+" さん"} </p>
                <NavLink to={"../"} className={"absolute left-0 ml-[15px]"}>
                    <div className="bg-mainColor text-white rounded-md w-[1.875rem] h-[1.875rem] p-[3px]">
                        <img src={'/images/back.png'} className="w-full h-full" />
                    </div>
                </NavLink>
            </div>
            <div className="text-xl bg-btnbgColor h-0.5"></div>
            <div className=" mx-[24px] flex flex-col">
                <p className="text-4xl text-mainColor py-8 font-black text-center pb-2">{"オススメ動画"}</p>
            </div>
            <video  className="h-auto w-full" controls preload="metadata" >
                <source src={data.value?.split("|")[2]+'#t=0.01'} type="video/mp4"/>
            </video>
            <div className="text-mainColor mt-[25px] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)] w-auto rounded-[10px] bg-white pb-[10px] mx-[28px] px-[20px]">
                <p className="font-black text-[18px] pt-[26px] text-mainColor"> {data.value?.split("|")[0]}</p>
                <p className="">{data.value?.split("|")[1]}</p>
                {/* {
                    Array(3).fill(0).map((element, index) => {
                        return <div key={index} className="w-full text-[13px] font-normal mt-[30px]">
                            <p className="">＜下の奥歯 外側＞</p>
                            <p>半開きの状態で頬を緩ませて磨きましょう</p>
                        </div>
                    })
                } */}
            </div>
        </div>
    );
};
export default VideoNotify;
