import axios, { AxiosResponse } from "axios";
import { produceWithPatches } from "immer";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { changeByAmount } from "../redux/reducers/indexslice";
import { changevisited, deccount } from "../redux/reducers/notificationslice";
import DefaultButton from "./button";
interface Element {
    id: number
    date: string,
    time: string,
    type: number,
    value: string | null,
    visited:number
}
interface ButtonProps {
    element: Element;
    index: number;
    buttonClick: () => void;
}
function NotifiComponent(props: ButtonProps) {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(true);
    const invited = (id:number) => {
        let date = new Date();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ "index":id});
        try {
            axios.post('/api/client/invited', body, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(deccount());
                    dispatch(changevisited(props.index));
                } else {
                    return false;
                }
            });
        }
        catch (err) {
            return false;
        }
    }
    const renderSwitch=(param:string)=> {
        switch(param) {
          case "1":
            return '明日はセルフ検査日です。忘れずにセルフ検査を行いましょう。';
          case "2":
                return 'セルフ検査実施日です。忘れずにセルフ検査を行いましょう。';
          default:
            return '昨日はセルフ検査を忘れてしまいましたか？忘れてしまった場合は、今日は忘れずに行いましょう。検査をして結果を記録していない場合は、検査結果を記録しましょう。';
        }
      }
    return (
        <>
            {
                Array(1).fill(0).map((v, index) => {
                    switch (props.element.type) {
                        case 1: return <div key={props.index} className="w-full">
                            <button className="w-full flex flex-col items-start font-black pt-[10px]" onClick={() => { setVisible(!visible); if(props.element.visited!=1){invited(props.element.id);}}}>
                                <p className=" text-dateColor text-[10px] ">
                                    {props.element.date.replace("-", ".") + " " + props.element.time.substring(0, 5)}
                                </p>
                                <p className="text-mainColor text-[13px] pt-[5px] text-justify">
                                    歯磨きは終わりましたか？忘れずに歯磨き記録を入力しましょう。
                                </p>
                            </button>
                            <div className="w-full h-[1px] bg-divColor mt-[5px]">
                            </div>
                        </div>
                        case 2: return <div key={props.index} className="w-full">
                            <button className="w-full flex flex-col items-start font-black pt-[10px]" onClick={() => { setVisible(!visible);if(props.element.visited!=1){invited(props.element.id);}}}>
                                <p className=" text-dateColor text-[10px] ">
                                    {props.element.date.replace("-", ".") + " " + props.element.time.substring(0, 5)}
                                </p>
                                <p className="text-mainColor text-[13px] pt-[5px] text-justify">
                                    {
                                        renderSwitch(props.element.value!)
                                    }
                                </p>
                            </button>
                            <div className={((visible||(props.element.value=="3")) ? "h-0 opacity-0 invisible" : "h-auto opacity-100 visible")}>
                                <div className="px-[10px] text-[13px] font-normal text-mainColor pt-[8px] text-justify">
                                    定期的なセルフ検査は重要です。食事２時間後に検査しましょう試薬はあらかじめ室温に戻しておきましょうこちらのリンクから、セルフ検査をしましょう。
                                </div>
                                <div className="my-[10px]">
                                    <NavLink to="selfcheck">
                                        <DefaultButton text="検査する" buttonClick={props.buttonClick}></DefaultButton>
                                    </NavLink>

                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-divColor mt-[5px]">
                            </div>
                        </div>
                        case 3: return <div key={props.index} className="w-full">
                            <button className="w-full flex flex-col items-start font-black pt-[10px]" onClick={() => { setVisible(!visible);if(props.element.visited!=1){invited(props.element.id);}}}>
                                <p className=" text-dateColor text-[10px] ">
                                    {props.element.date.replace("-", ".") + " " + props.element.time.substring(0, 5)}
                                </p>
                                <p className="text-mainColor text-[13px] pt-[5px] text-justify">
                                    {"昨日のあなたの歯磨き回数は" + props.element.value + "回でした。"}
                                </p>
                            </button>
                            <div className="w-full h-[1px] bg-divColor mt-[5px]">
                            </div>
                        </div>
                        case 4: return <div key={props.index} className="w-full">
                            <button className="w-full flex flex-col items-start font-black pt-[10px]" onClick={() => { setVisible(!visible);if(props.element.visited!=1){invited(props.element.id);}}}>
                                <p className=" text-dateColor text-[10px] text-justify">
                                    {props.element.date.replace("-", ".") + " " + props.element.time.substring(0, 5)}
                                </p>
                                <p className="text-mainColor text-[13px] pt-[5px] text-justify">
                                    {props.element.value?.split("|")[0]}
                                </p>
                            </button>
                            {
                                visible?<div></div>:
                                <div className={(visible ? "h-0 opacity-0 invisible" : "h-auto opacity-100 visible")}>
                                    <div className="px-[10px] text-[13px] font-normal text-mainColor pt-[8px] text-justify">
                                        あなたにオススメの歯周病向けのセルフケア動画です。<br></br>動画を見ながら、しっかりと磨きましょう
                                    </div>
                                    <div className="my-[10px] h-[152px] bg-black relative w-full grid">
                                        {/* <video  className="h-auto w-full disabled" controls >
                                            <source src= {props.element.value?.split("|")[1]} type="video/mp4"/>
                                        </video> */}

                                        <NavLink to="video" className="place-self-center">
                                            <DefaultButton text="動画を見る" buttonClick={()=>{dispatch(changeByAmount(props.index));}}></DefaultButton>
                                        </NavLink>
                                    </div>
                                </div>
                            }
                            <div className="w-full h-[1px] bg-divColor mt-[5px]">
                            </div>
                        </div>
                    }
                })
            }

        </>
    );
};
export default NotifiComponent;
