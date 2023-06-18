import React, { useState } from "react";
import DefaultButton from "../../../components/button";
import { useAppSelector } from "../../../redux/hooks";
import { LINELOGIN } from "../../../redux/type";
export interface IUser {
    name: string;
    age: number;
}
const Alignemnt = () => {
    const id = useAppSelector((state) => state.authenticater.id);
    const LineLogin=()=>{
        window.location.href=LINELOGIN+id+"&bot_prompt=normal&scope=openid&&nonce=09876xyz";
    }
    return (
        <div className="">
            <p className="text-6xl text-teal-700 pt-40 font-semibold text-center pb-32">PERIO</p>
            <div className="px-12">
                <p className="mb-15 text-xl font-bold text-teal-700 pb-28 text-center"> LINEと連携する</p>
                <DefaultButton buttonClick={LineLogin} text="連携"/>
            </div>
        </div>
    );
};
export default Alignemnt;
