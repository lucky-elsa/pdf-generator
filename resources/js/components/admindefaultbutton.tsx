import React from "react";
interface ButtonProps {
    text: string;
    px:number;
    buttonClick: ()=>void;
  }
function AdminSmButton(props:ButtonProps){
    return (
        <button onClick={props.buttonClick} className={"px-[15px] border-adminborderColor mx-auto text-center py-[8px] bg-adminbuttonColor rounded-[8px] text-white text-[16px] border-2  px-["+props.px+"px]"}>{props.text}</button>
    );
};
export default AdminSmButton;
