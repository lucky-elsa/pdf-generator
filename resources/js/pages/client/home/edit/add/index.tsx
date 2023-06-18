import React, { useState, useEffect } from "react";
import {Route,Routes,NavLink, useLocation } from 'react-router-dom';
import Bresh from "./bresh";
import Meal from "./meal";
const Adder = () => {
    const [tabindex, setTab]=useState(1);
    const location = useLocation();
    const path=location.pathname.split("/");
    useEffect(() => {
        if(path[6]=='meal'){
            setTab(2);
        }
    }, [location])
    function setTabIndex(val:number){
        setTab(val);
    }
    return (
        <div>
            <p className="text-3xl text-mainColor py-4 font-black text-center pb-2">{ "記録をする"}</p>
            <p className="text-base text-mainColor pt-2 font-light text-center pb-2">{"歯磨きや食事の内容を記録しましょう"}</p>
            <div className="mt-4 border-y border-mainColor mx-4">
                <ul className="flex flex-row -mb-px text-xl font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li className="basis-1/2 " role="presentation">
                        <NavLink to="bresh">
                            <button onClick={() => { setTabIndex(1) }} className={"border-mainColor text-xl w-full inline-block px-4 py-1  border-b font-black border-transparent  "+(tabindex==1?"bg-btnbgColor text-white":"text-mainColor bg-white")} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">歯みがき</button>
                        </NavLink>
                    </li>
                    <li className="basis-1/2 border-x border-teal-400" role="presentation">
                        <NavLink to="meal">
                        <button onClick={() => { setTabIndex(2) }} className={"border-mainColor text-xl w-full inline-block px-4 py-1  border-b font-black border-transparent  "+(tabindex==2?"bg-btnbgColor text-white":"text-mainColor bg-white")} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">食事</button>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="mx-4">
            <Routes >
                <Route  path="/bresh" element={ <Bresh />}/>
                <Route  path="/meal" element={ <Meal />}/>
            </Routes>
            </div>
        </div>
    );
};

export default Adder;
