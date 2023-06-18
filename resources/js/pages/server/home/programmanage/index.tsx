import React, { useState } from 'react';
import {Route,Routes, Navigate, NavLink } from 'react-router-dom';
import ProgramA from './programa';
import ProgramB from './programb';
import ProgramC from './programc';
import ProgramD from './programd';

const ProgramManager = () => {
    const [index, setIndex]=useState("A");
    return (
        <div className='min-h-screen h-full overflow-hidden ml-[60px] flex flex-basis'>
            <div className='basis-1/4 bg-white  px-[20px] pt-[54px] flex flex-col text-[20px] font-bold'>
            <p className="mx-2 text-[24px] hover:text-mainColor sm:py-2 font-content "> {"プログラム"+index}</p>
                     <NavLink to="programA" className=" px-1">
                        <button onClick={()=>{setIndex("A")}} className="mx-2 underline hover:text-mainColor sm:py-2 font-content"> プログラムA</button>
                    </NavLink>
                    <NavLink to="programB" className=" px-1">
                        <button onClick={()=>{setIndex("B")}} className="mx-2 underline hover:text-mainColor sm:py-2 font-content"> プログラムB</button>
                    </NavLink>
                    <NavLink to="programC" className=" px-1">
                        <button onClick={()=>{setIndex("C")}} className="mx-2 underline hover:text-mainColor sm:py-2 font-content"> プログラムC</button>
                    </NavLink>
                    <NavLink to="programD" className=" px-1">
                        <button onClick={()=>{setIndex("D")}} className="mx-2 underline hover:text-mainColor sm:py-2 font-content"> プログラムD</button>
                    </NavLink>
            </div>
            <div className='basis-3/4 ml-[20px]  mt-[20px] flex flex-col bg-white'>
                <Routes>
                    <Route path='programA' element={<ProgramA />} />
                    <Route path='programB' element={<ProgramB />} />
                    <Route path='programC' element={<ProgramC />} />
                    <Route path='programD' element={<ProgramD />} />
                </Routes>
            </div>
        </div>
    )
  }
  export default ProgramManager;
