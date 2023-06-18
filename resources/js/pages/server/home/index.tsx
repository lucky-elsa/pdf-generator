import React, { useState } from "react";
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import PatientManager from "./patientmanage";
import ProgramManager from "./programmanage";
const Home = () => {
    return (
        <div className="bg-adminbgColor min-h-screen h-full">
            <div className="bg-adminmainColor p-2 w-full text-white md:flex md:items-center justify-between flex-wrap text-base font-semibold text-center placeholder:tracking-wider">
                <div>
                    <p className="px-2 ">MFT クリニック画面</p>
                </div>
                <div className="md:flex md:items-center">
                    <NavLink to="programmanage/" className="md:border-r-[1px] px-1">
                        <p className="mx-2 underline hover:text-mainColor sm:py-2 font-content"> プログラムリスト</p>
                    </NavLink>
                    <NavLink to="patientmamage/" className="md:border-r-[1px] px-1">
                        <p className="mx-2 underline hover:text-mainColor sm:py-2">患者管理</p>
                    </NavLink>
                    <p className="px-2">東京医科歯科大学</p>
                </div>
            </div>
            <div className=' h-full'>
                <Routes>
                    <Route path="/patientmamage/*"  element={<PatientManager />}/>
                    <Route path="/programmanage"  element={<Navigate to="/admin/main/programmanage/programA"/>}/>
                    <Route path="/programmanage/*"  element={<ProgramManager/>}/>
                </Routes>
            </div>
        </div>
    );
};
export default Home;
