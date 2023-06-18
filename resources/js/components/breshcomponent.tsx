import React, { useState } from "react";
interface ButtonProps {
    tabindex: number;
    buttonClick: (index:number)=>void;
}
function BreshComponent(props: ButtonProps) {
    return (
        <div className="rounded-xl mt-4  shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)] h-20 bg-white">
            <ul className=" h-full flex flex-row  text-sm font-medium text-center " id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                <li className=" basis-3/6 h-full " role="presentation">
                    <div  className={"py-2 flex justify-center items-center rounded-xl h-full text-xs w-full  font-black border-transparent "+(props.tabindex==0?"bg-white text-btnbgColor":"bg-btnbgColor text-white")} id="profile-tab" data-tabs-target="#profile" role="tab" aria-controls="profile" aria-selected="false">
                        <img className="h-full" src={"/images/"+(props.tabindex==0?"comb_none.svg":"comb.svg")} alt="Icon" />
                        歯みがき
                    </div>
                </li>
                <li className="mx-2 basis-1/6 h-full py-2" role="presentation">
                    <button onClick={() => { props.buttonClick(1) }} className={"rounded-xl h-full text-xs w-full    font-black border-transparent  " + (props.tabindex == 1 ? "bg-btnbgColor text-white" : "text-mainColor bg-white")} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false"><span className="font-black text-base">3</span>分<br></br>未満</button>
                </li>
                <li className="mx-2 basis-1/6 py-2" role="presentation h-full">
                    <button onClick={() => { props.buttonClick(2) }} className={"rounded-xl h-full text-xs w-full    font-black border-transparent  " + (props.tabindex == 2 ? "bg-btnbgColor text-white" : "text-mainColor bg-white")} id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false"><span className="font-black text-base">3-5</span><br></br>分</button>
                </li>
                <li className="mx-2 basis-1/6 py-2" role="presentation h-full">
                    <button onClick={() => { props.buttonClick(3) }} className={"rounded-xl h-full text-xs w-full    font-black border-transparent  " + (props.tabindex == 3 ? "bg-btnbgColor text-white" : "text-mainColor bg-white")} id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false"><span className="font-black text-base">5-10</span><br></br>分</button>
                </li>
                <li className="mx-2 basis-1/6 py-2" role="presentation h-full">
                    <button onClick={() => { props.buttonClick(4) }} className={"rounded-xl h-full text-sm w-full    font-black border-transparent  " + (props.tabindex == 4 ? "bg-btnbgColor text-white" : "text-mainColor bg-white")} id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false"><span className="font-black text-base">10</span>分<br></br>以上</button>
                </li>
            </ul>
        </div>
    );
};
export default BreshComponent;
