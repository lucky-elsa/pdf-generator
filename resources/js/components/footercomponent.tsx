import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
interface ButtonProps {
    selectindex: number;
    SetIndex: (index:number)=>void;
  }
function FooterComponent(props:ButtonProps){
    const count = useAppSelector((state) => state.notification.count);
    return (
        <footer className="p-4 bg-white fixed bottom-0 h-20 w-full rounded-t-[40px] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.1)]">
                <div className="flex flew-row" >
                    <NavLink to="register/" className={"basis-1/3 " + (props.selectindex == 1 ? "text-footColor" : "text-gray-400")}>
                        <button type="button" onClick={() => { props.SetIndex(1) }} className="mx-auto w-full" >
                            <div className="text-white rounded-md w-[1.5625rem] h-[1.5625rem] text-xl flex flex-col mx-auto">
                                <img src={props.selectindex == 1 ? '/images/add-icon-hover.png' : '/images/add-icon.png'} className="w-full h-full" />
                            </div>
                            <p className="text-xs text-center">記録する</p>
                        </button>
                    </NavLink>
                    <NavLink to="edit/" className={"basis-1/3 " + (props.selectindex == 2 ? "text-footColor" : "text-gray-400")} >
                        <button type="button" onClick={() => { props.SetIndex(2) }} className="mx-auto w-full" >
                            <div className="text-white rounded-md w-[1.5625rem] h-[1.5625rem] text-xl flex flex-col mx-auto">
                                <img src={props.selectindex == 2 ? '/images/chk-icon-hover.png' : '/images/chk-icon.png'} className="w-full h-full" />
                            </div>
                            <p className="text-xs  text-center">記録を見る</p>
                        </button>
                    </NavLink>
                    <NavLink to="email/" className={"basis-1/3 relative " + (props.selectindex == 3 ? "text-footColor" : "text-gray-400")} >
                        <button type="button" onClick={() => { props.SetIndex(3) }} className="mx-auto w-full">
                            <div className="text-white rounded-md w-[1.5625rem] h-[1.5625rem] text-xl flex flex-col mx-auto">
                                <img src={props.selectindex == 3 ? '/images/msg-icon-hover.png' : '/images/msg-icon.png'} className="w-full h-full" />
                            </div>
                            <p className="text-xs  text-center">お知らせ</p>
                        </button>
                        <div className="flex items-center justify-center absolute w-full h-full top-0">
                        {count==0?<p></p>:<p className="bg-notifyColor text-white ml-[25px]  rounded-full text-[10px] px-[5px]  py-[3px]">{count}</p>}
                        </div>
                    </NavLink>
                </div>
            </footer>
    );
};
export default FooterComponent;
