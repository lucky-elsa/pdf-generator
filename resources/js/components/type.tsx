import React from "react";
interface ButtonProps {
    text: string;
  }
function TypeHeader(props:ButtonProps){
    return (
       <div className="py-2 w-full text-center bg-white border-y border-mainColor text-xl text-mainColor font-bold">
           {props.text}
       </div>
    );
};
export default TypeHeader;
