import React from "react";
interface ButtonProps {
    text: string;
    buttonClick: ()=>void;
  }
function AdminDefaultButton(props:ButtonProps){
    return (
        <button onClick={props.buttonClick} className="my-5 text-center px-5 py-3 bg-adminbuttonColor rounded-2xl text-white text-xs">{props.text}</button>
    );
};
export default AdminDefaultButton;
