import React from "react";
interface ButtonProps {
    text: string;
    className:string;
    size:string;
    path:string;
  }
function ToolButton(props:ButtonProps){
    return (
        <div className={props.size}>
            <div className={"flex flex-col justify-center items-center rounded-xl h-full text-xs w-full  font-black border-transparent "+props.className} id="profile-tab" data-tabs-target="#profile" role="tab" aria-controls="profile" aria-selected="false">
                <img src={"../../../images/"+props.path} alt="Icon" />
                <span className="py-2">{props.text}</span>
            </div>
        </div>
    );
};
export default ToolButton;
