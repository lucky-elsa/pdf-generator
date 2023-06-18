import React from "react";
interface ButtonProps {
    text: string;
    buttonClick: ()=>void;
  }
function DefaultButton(props:ButtonProps){
    return (
        <button onClick={props.buttonClick} className="font-semibold flex flex-col mx-auto my-4 text-center px-5 py-2 bg-gradient-to-r from-gradientoneColor to-gradienttwoColor rounded-full text-white text-[15px]">{props.text}</button>
    );
};
export default DefaultButton;
