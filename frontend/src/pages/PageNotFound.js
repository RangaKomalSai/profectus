import React from "react";
import Button from "../components/Button";
import pagenotfound from "../images/pagenotfound.png";

function PageNotFound() {
  return (
    <div className="flex h-lvh justify-center items-center gap-10">
      <div className="w-1/2">
        <img src={pagenotfound} alt="" />
      </div>
      <div className="flex flex-col h-lvh justify-center items-start gap-10 w-1/2">
        <h1 className="font-bold text-4xl">Oops... Page Not Found</h1>
        <Button text="Go back to Home" path="/home" />
      </div>
    </div>
  );
}

export default PageNotFound;
