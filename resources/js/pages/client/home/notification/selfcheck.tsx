import React, { useEffect, useState } from "react";
import { Route, Routes, NavLink, useLocation, Navigate } from 'react-router-dom';
import { BiArrowBack, BiCalendar } from "react-icons/bi";
import DefaultButton from "../../../../components/button";
import TypeHeader from "../../../../components/type";
import { useAppSelector } from "../../../../redux/hooks";

const SelfCheck = () => {
    const name=useAppSelector((state) => state.authenticater.name);
    return (
        <div className="mx-[3px]">
            <div className="flex justify-center items-center pt-4 pb-2 px-4 relatvice">
                <p className="text-base text-mainColor  font-semibold text-center">{name+" さん"} </p>
            </div>
            <div className="text-xl bg-btnbgColor h-0.5"></div>
            <div className=" mx-[24px] flex flex-col">
                <p className="text-4xl text-mainColor py-8 font-black text-center pb-2">{"セルフ検査"}</p>
                <p className="text-base text-mainColor pt-2 pb-4 font-light text-center">{"セルフ検査を記録しましょう"}</p>
                <TypeHeader text="セルフ検査" />
            </div>
            <div className="mx-[20px]">
                <div className="mt-[25px] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)] w-full rounded-[10px] bg-white px-[20px] pt-[24px] pb-[10px]">
                    <div className="w-full h-[177px] bg-imageColor  flex flex-col justify-center">
                        <p className="text-[18px] text-semibold text-center">説明動画</p>
                    </div>
                    <p className="font-black text-mainColor text-[13px] pt-[10px]">
                        手順1
                    </p>
                    <p className="text-mainColor pt-[12px] text-[13px] font-normal">
                        試薬は事前に冷蔵庫から出して15分程度置いて室温に戻してください
                    </p>
                    <div className="w-full h-[1px] bg-divColor mt-[8px]">
                    </div>
                    <p className="font-black text-mainColor text-[13px] pt-[10px]">
                        手順2
                    </p>
                    <p className="text-mainColor pt-[12px] text-[13px] font-normal">
                        試薬は事前に冷蔵庫から出して15分程度置いて室温に戻してください
                    </p>
                </div>
                <div className="my-[24px]">
                    <NavLink to="../record">
                        <DefaultButton text="結果を撮影する" buttonClick={() => { }}></DefaultButton>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
export default SelfCheck;
