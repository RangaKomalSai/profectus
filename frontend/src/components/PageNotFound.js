import React from "react";
import pagenotfound from "../images/404.png";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex justify-center items-center gap-10 flex-wrap flex-col lg:flex-row h-screen">
      <div className="w-1/3 flex justify-center items-center">
        <img src={pagenotfound} alt="" />
      </div>
      <div className="flex flex-col justify-center items-start gap-10 w-1/3">
        <h1 className="font-bold text-4xl">Oops... Page Not Found</h1>
        <button className="py-1 px-3 my-3 flex justify-center border-2 border-p-blue text-white bg-blue-500 hover:bg-blue-600 hover:border-blue-600 font-bold rounded transition duration-300 flex-nowrap hover:shadow-blue-600/80 hover:shadow-sm">
          <Link to="/">Go back to Home</Link>
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
