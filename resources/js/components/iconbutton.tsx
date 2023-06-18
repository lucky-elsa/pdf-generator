import React from "react";
import { BsPencil } from "react-icons/bs";
interface ButtonProps {
    text: string;
    buttonClick: () => void;
    className: string;
}
function IconButton(props: ButtonProps) {
    return (
        <button type="button" onClick={props.buttonClick} className={props.className} >
            <BsPencil className="text-teal-700 text-xl flex flex-col mx-auto" />
            <p className="text-xs text-teal-700 text-center">{props.text}</p>
        </button>
    );
};
export default IconButton;
