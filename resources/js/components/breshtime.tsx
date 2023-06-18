import React from "react";
interface ButtonProps {
    time:string;
    buttonClick: (visible: boolean) => void;
    deleteClick: ()=>void;
}
function BreshTime(props: ButtonProps) {
    return (
        <div className="bg-white with-full py-[24px] px-[28px]  mb-[30px] flex justify-between  rounded-[10px] shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]">
            <p className="text-mainColor text-[32px] font-black tracking-tight text-center">
               {props.time.substring(0,5)}
            </p>
            <div className="flex items-center">
                <button onClick={() => { props.buttonClick(true) }} className="text-white rounded-md  w-[25px] h-[25px] text-xl mr-[26.24px] mx-auto">
                    <img src={'/images/add-icon.png'} className="w-full h-full" />
                </button>
                <button onClick={props.deleteClick} className="text-white rounded-md w-[25px] h-[25px] text-xl mx-auto">
                    <img src={'/images/delete-icon.png'} className="w-full h-full" />
                </button>
            </div>
        </div>
    );
};
export default BreshTime;
