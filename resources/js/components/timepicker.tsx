import React from "react";
import { BiChevronUp, BiChevronDown} from "react-icons/bi";
interface TimepickerButton {
    time:number;
    min:number;
    onClickUp:(updown:boolean)=>void;
  }
function Timepicker(props:TimepickerButton){
    return (
        <div className="rounded-lg border-2 border-mainColor text-3xl text-mainColor font-bold py-2 px-2">
            <div className="flex justify-between items-center">
                <div></div>
                <div className="flex justify-center">
                    <p className="">{props.time<10?"0"+props.time:props.time}</p>
                    <p className="px-2">:</p>
                    <p className="">{props.min<10?"0"+props.min:props.min}</p>
                </div>
                <div className="flex flex-col">
                    <button onClick={()=>{props.onClickUp(true)}}>
                        <BiChevronUp className="text-base"/>
                    </button>
                    <button onClick={()=>{props.onClickUp(false)}}>
                        <BiChevronDown className="text-base"/>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Timepicker;
