import React, { useEffect, useState } from "react";
import TypeHeader from "../../../../components/type";
import DefaultButton from "../../../../components/button";
import BreshComponent from "../../../../components/breshcomponent";
import ToolButton from "../../../../components/toolcomponent";
import {  useAppSelector } from '../../../.././redux/hooks';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";

const Diary = () => {
    const navigate = useNavigate();
    const index=Number(localStorage.getItem('index'));
    const data=useAppSelector((state) => state.data.value[index]);
    const [index_1, setIndex_1] = useState(false);
    const [index_2, setIndex_2] = useState(false);
    const [index_3, setIndex_3] = useState(false);
    const [time1, settime1] = useState('');
    useEffect(() => {
        if(data){
            setIndex_1(Boolean(Number(data.value!.split("|")[0].split(',')[0]))!);
            setIndex_2(Boolean(Number(data.value!.split("|")[0].split(',')[1]))!);
            setIndex_3(Boolean(Number(data.value!.split("|")[0].split(',')[2]))!);
            settime1(data.time!);
            setTabIndex(Number(data.value!.split("|")[1]));
        }
    }, [data])
    function setTime(val:number){
        if(tabindex==val){
            setTabIndex(0);
        }
        else{
            setTabIndex(val);
        }
    }
    const update = () => {
        ; const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const body = JSON.stringify({"update":{"id":data.id,"time":time1,"value":`${Number(index_1)+","+Number(index_2)+","+Number(index_3)}`+"|"+tabindex}});
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
    const [tabindex,setTabIndex]=useState(0);
    return (
        !data?<></>:
        <div >
            <p className="text-4xl text-mainColor py-8 font-black text-center pb-2">{"記録を編集する"}</p>
            <p className="text-base text-mainColor pt-2 font-light text-center pb-2">{"歯磨きや食事の内容を記録しましょう"}</p>
            <TypeHeader text="歯みがき"/>
            <div className="mt-8 px-4">
                <BreshComponent tabindex={tabindex} buttonClick={setTime} />
            </div>
            <div className="flex  flex-row items-cneter justify-between mt-8 px-4">
                <ToolButton ispadding={true} size="w-28 h-36" buttonClick={() => { setIndex_1(!index_1) }} text="歯間ブラシ" className={index_1 == true ? "bg-btnbgColor text-white" : "bg-white text-mainColor shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]"} path={index_1 == true ? "bresh.svg" : "bresh-none.svg"} />
                <ToolButton ispadding={false} size="w-28 h-36" buttonClick={() => { setIndex_2(!index_2) }} text="洗口剤" className={index_2 == true ? "bg-btnbgColor text-white" : "bg-white text-mainColor shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]"} path={index_2 == true ? "material.svg" : "material-none.svg"} />
                <div className="w-28 h-36">
                    <button onClick={()=>{setIndex_3(!index_3);}} className={"flex flex-col justify-center items-center rounded-xl h-full text-xs w-full  font-black border-transparent "+(index_3 == true ? "bg-btnbgColor text-white" : "bg-white text-mainColor shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]")} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        <img src={"../../../images/"+(index_3 == true ? "flox.svg" : "flox-none.svg")} alt="Icon" />
                        フロス・<br/>糸ようじ
                    </button>
                </div>
            </div>
            <div className="px-8 pt-4">
                <input style={{WebkitAppearance: "none"}} className="flex items-center justify-center focus:outline-none focus:border-mainColor tracking-[.3em] text-center rounded-lg border border-mainColor text-[26px] text-mainColor font-bold  px-2 w-full mt-4 bg-white" type="time"  value={time1} onChange={(ev) => {settime1(ev.target.value);}} />
            </div>
            <div>

            </div>
            <DefaultButton text="記録をする" buttonClick={update}  />
        </div>
    );
};

export default Diary;
