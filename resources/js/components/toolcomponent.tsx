import React from "react";
interface ButtonProps {
    text: string;
    buttonClick: ()=>void;
    className:string;
    ispadding:boolean;
    size:string;
    path:string;
  }
function ToolButton(props:ButtonProps){
    return (
        <div className={props.size}>
            <button onClick={props.buttonClick} className={"flex flex-col justify-center items-center rounded-xl h-full text-xs w-full  font-black border-transparent "+props.className} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                <img src={"/images/"+props.path} alt="Icon" />
                {props.ispadding&&<div className="h-[25px]"></div>}
                {props.text}
            </button>
        </div>
    );
};
export default ToolButton;
