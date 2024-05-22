import React from "react";
import { Link } from "react-router-dom";

function Button({ text, path, btncolor }) {
  return (
    // <button className="py-1 px-3 my-3 block border-2 border-p-blue text-white bg-p-blue hover:bg-dark-blue hover:border-dark-blue font-bold rounded transition duration-300 flex-nowrap hover:shadow-dark-blue/80 hover:shadow-sm ">
    //   <Link to={path} className=" flex justify-center">
    //     <span>{text}</span>
    //   </Link>
    // </button>
    <Link
      to={path}
      className="py-1 px-3 my-3 flex justify-center border-2 border-p-blue text-white bg-p-blue hover:bg-dark-blue hover:border-dark-blue font-bold rounded transition duration-300 flex-nowrap hover:shadow-dark-blue/80 hover:shadow-sm"
    >
      <span>{text}</span>
    </Link>
  );
}

export default Button;
