import React, { useState , useEffect} from "react";
import Button from "../../../../components/button";
import {Route,Routes,NavLink,Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import ToolButton from "../../../../components/toolcomponent_none";
import DefaultButton from "../../../../components/button";
import {  useAppDispatch,useAppSelector } from '../../../.././redux/hooks'
import {  changedata,changedate } from '../../../.././redux/reducers/dataslice'
import {  changeByAmount } from '../../../.././redux/reducers/indexslice'
import {BRESH_TIME, SELF, MO_STATUS} from "../../../../redux/type";
import { changeDate } from "../../../../redux/reducers/addslice";

const Main = () => {
    const dispatch = useAppDispatch();
    const date1=useAppSelector((state) => state.data.date);
    const date =localStorage.getItem('date')?new Date(localStorage.getItem('date')!):date1;
    const data=useAppSelector((state) => state.data.value);
    const loaddata = () => {
        let datestr=date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            axios.get(`/api/client/loaddata?date=${datestr}`, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(changedata(response.data["data"][0]));
                } else {
                }
            });
        }
        catch (err) {

        }
    }
    useEffect(() => {
        loaddata();
    },[date1])
    var weekday = ["日", "月", "火", "水", "木", "金", "土"];
    let day=new Date();
    function changeDay(val:Boolean){
       if(val){
           day=new Date(date);
           day.setDate(day.getDate()-1);
           dispatch(changedate(day));
       }
       else{
            day=new Date(date);
            day.setDate(day.getDate()+1);
            dispatch(changedate(day));
       }
    }
    return (
        <div>
            <p className="text-3xl text-mainColor py-4 font-black text-center pb-2">{"歯みがき記録"}</p>
            <p className="text-base text-mainColor pt-2  font-light text-center pb-2">{"自分の記録をみてみましょう"}</p>
            <div className="flex justify-evenly items-end">
                <div>
                    <button type="button" onClick={() => { changeDay(true) }}>
                        <p className="text-center underline text-btnbgColor text-[14px]">前日</p>
                    </button>
                </div>
                <div >
                    <p className="text-mainColor flex items-end">
                        <span className="text-[14px]">{date.getFullYear()}/</span>
                       <span className="text-[26px] font-semibold  leading-[2.4rem]">{(date.getMonth()>=9)?(date.getMonth()+1):"0"+(date.getMonth()+1)}</span>
                       <span className="text-[14px] font-semibold">/</span>
                       <span className="text-[26px] font-semibold  leading-[2.4rem]">
                       {(date.getDate()>=10)?date.getDate():"0"+date.getDate()}</span>
                        <span>({weekday[date.getDay()]})</span>
                    </p>
                </div>
                <div>
                <button type="button" onClick={() => { changeDay(false) }}>
                    <p className="text-center underline text-btnbgColor text-[14px]">翌日</p>
                </button>
                </div>
            </div>
            <div className="bg-btnbgColor h-0.5 "></div>

            <div className="mx-8">
            {
                data && data.map((v,index) =>
                    {
                        switch(v.type){
                            case 1: return <div key={index}>
                                        <div className="bg-white rounded-2xl p-4 flex flex-row mt-[22PX] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]">
                                            <p className="basis-1/6 text-center text-btnbgColor text-xl">{v.time.split(":")[0].substring(0,1)=="0"?v.time.split(":")[0].substring(1):v.time.split(":")[0]}:{v.time.split(":")[1]}</p>
                                            <p className="basis-1/6 text-center text-mainColor text-xl font-extrabold">起床</p>
                                            <p className="basis-1/2"></p>
                                            <NavLink to="getup" className="basis-1/6">
                                                <button onClick={()=>{dispatch(changeByAmount(index));}}>
                                                    <p className=" text-center text-btnbgColor text-[15px] underline font-bold">編集</p>
                                                </button>
                                            </NavLink>
                                        </div>
                                        <div className="bg-white rounded-2xl p-4 mt-[22PX] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]">
                                            <div className="flex flex-row ">
                                                <p className="basis-1/6 text-center text-btnbgColor text-xl">{v.time.split(":")[0].substring(0,1)=="0"?v.time.split(":")[0].substring(1):v.time.split(":")[0]}:{v.time.split(":")[1]}</p>
                                                <p className="basis-1/2 text-center text-mainColor text-xl font-extrabold">朝のお口の状態</p>
                                                <p className="basis-1/6"></p>
                                                <NavLink to="status" className="basis-1/6">
                                                    <button onClick={()=>{dispatch(changeByAmount(index));}}>
                                                        <p className=" text-center text-btnbgColor text-[15px] underline font-bold">編集</p>
                                                    </button>
                                                </NavLink>
                                            </div>
                                            <p className="basis-1/6 text-mainColor text-[13px]  font-bold px-8 pt-2">{MO_STATUS[Number(v.value!)-1]}</p>
                                        </div>
                                    </div>;
                            case 2:return <div key={index}>
                                        <div className="bg-white rounded-2xl p-4 mt-[22PX] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]">
                                            <div className="flex flex-row ">
                                                <p className="basis-1/6 text-center text-btnbgColor text-xl">{v.time.split(":")[0].substring(0,1)=="0"?v.time.split(":")[0].substring(1):v.time.split(":")[0]}:{v.time.split(":")[1]}</p>
                                                <p className="basis-1/2 text-center text-mainColor text-xl font-extrabold">歯みがき記録</p>
                                                <p className="basis-1/6"></p>
                                                <NavLink to="diary" className="basis-1/6">
                                                    <button onClick={()=>{dispatch(changeByAmount(index));}}>
                                                        <p className=" text-center text-btnbgColor text-[15px] underline font-bold">編集</p>
                                                    </button>
                                                </NavLink>
                                            </div>
                                            <div className="flex  flex-row items-cneter justify-around mt-4">
                                                <ToolButton size="w-16 h-24"  text={BRESH_TIME[Number(v.value!.split("|")[1])-1]} className={Number(v.value!.split("|")[1])==0?"bg-white text-btnbgColor":"bg-btnbgColor text-white"} path={Number(v.value!.split("|")[1])==0?"comb_none.svg":"comb.svg"}/>
                                                <ToolButton size="w-16 h-24"  text="" className={(Number(v.value!.split("|")[0].split(',')[0]))==1?"bg-btnbgColor text-white":"bg-white text-mainColor shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]"} path={(Number(v.value!.split("|")[0].split(',')[0]))==1?"bresh.svg":"bresh-none.svg"}/>
                                                <ToolButton size="w-16 h-24"  text="" className={(Number(v.value!.split("|")[0].split(',')[1]))==1?"bg-btnbgColor text-white":"bg-white text-mainColor shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]"} path={(Number(v.value!.split("|")[0].split(',')[1]))==1?"material.svg":"material-none.svg"}/>
                                                <ToolButton size="w-16 h-24"  text="" className={(Number(v.value!.split("|")[0].split(',')[2]))==1?"bg-btnbgColor text-white":"bg-white text-mainColor shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]"} path={(Number(v.value!.split("|")[0].split(',')[2]))==1?"flox.svg":"flox-none.svg"}/>
                                            </div>
                                        </div>
                                    </div>;
                            case 3:return <div key={index}>
                                        <div className="bg-white rounded-2xl p-4 mt-[22PX] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]">
                                            <div className="flex flex-row ">
                                                <p className="basis-1/6 text-center text-btnbgColor text-xl">{v.time.split(":")[0].substring(0,1)=="0"?v.time.split(":")[0].substring(1):v.time.split(":")[0]}:{v.time.split(":")[1]}</p>
                                                <p className="basis-1/2 text-center text-mainColor text-xl font-extrabold">食事の記録</p>
                                                <p className="basis-1/6"></p>
                                                <NavLink to="meal" className="basis-1/6">
                                                    <button onClick={()=>{dispatch(changeByAmount(index));}}>
                                                        <p className=" text-center text-btnbgColor text-[15px] underline font-bold">編集</p>
                                                    </button>
                                                </NavLink>
                                            </div>
                                            <div>
                                                <img src={v.value!.split("|")[1]} className="w-full py-4"></img>
                                            </div>
                                            <p className="basis-1/6 text-mainColor text-[13px] w-full  font-bold px-8 py-2 " style={{overflowWrap:"break-word"}}>{v.value!.split("|")[0]}</p>
                                        </div>
                                    </div>;
                            case 4:return <div key={index}>
                                        <div className="bg-white rounded-2xl p-4 flex flex-row mt-[22PX] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]">
                                            <p className="basis-1/6 text-center text-btnbgColor text-xl">{v.time.split(":")[0].substring(0,1)=="0"?v.time.split(":")[0].substring(1):v.time.split(":")[0]}:{v.time.split(":")[1]}</p>
                                            <p className="basis-1/6 text-center text-mainColor text-xl font-extrabold">就寝</p>
                                            <p className="basis-1/2"></p>
                                            <NavLink to="bedtime" className="basis-1/6">
                                                <button onClick={()=>{dispatch(changeByAmount(index));}}>
                                                    <p className=" text-center text-btnbgColor text-[15px] underline font-bold">編集</p>
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>;
                            case 5:return <div key={index}>
                            <div className="bg-white rounded-2xl p-4 mt-[22PX] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]">
                                <div className="flex flex-row ">
                                    <p className="basis-1/6 text-center text-btnbgColor text-xl">{v.time.split(":")[0].substring(0,1)=="0"?v.time.split(":")[0].substring(1):v.time.split(":")[0]}:{v.time.split(":")[1]}</p>
                                    <p className="basis-1/2 text-center text-mainColor text-xl font-extrabold">セルフ検査</p>
                                    <p className="basis-1/6"></p>
                                    {/* <NavLink to="meal" className="basis-1/6">
                                        <button onClick={()=>{dispatch(changeByAmount(index));}}>
                                            <p className=" text-center text-btnbgColor text-[15px] underline font-bold">編集</p>
                                        </button>
                                    </NavLink> */}
                                </div>
                                <div>
                                    <img src={v.value!.split("|")[1]} className="w-full py-4"></img>
                                </div>
                                <p className="basis-1/6 text-mainColor text-[13px] w-full  font-bold px-8 py-2 " style={{overflowWrap:"break-word"}}>{SELF[Number(v.value!.split("|")[0])-1]}</p>
                            </div>
                        </div>;
                        }
                    }
                )
            }
            </div>
          {  data.length!=0 && <NavLink to="add/bresh" className="basis-1/6"><DefaultButton text="記録をする" buttonClick={() => { dispatch(changeDate(date));}}></DefaultButton> </NavLink>}
        </div>
    );
};

export default Main;
