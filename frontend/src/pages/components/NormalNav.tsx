import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Replace next/link with react-router-dom
import ablogo from "../../images/white_abhyuday_2.png";
import { useNavigate } from "react-router-dom";

function NormalNav() {
  const navigate = useNavigate();

  const [navSticky, setNavSticky] = useState(false);
  return (
    <div
      className={`fixed w-full transition-all duration-200 z-[1000] ${
        navSticky ? "bg-gradient-to-b from-[#1d1d6d] to-[#071823]" : "bg-nav"
      }`}
    >
      <div className="flex items-center h-[10vh] lg:h-[12vh] justify-center w-4/5 mx-auto">
        <div className="font-bold text-white text-2xl">
          <Link to="/">
            <img src={ablogo} alt="Logo" className="w-32 md:w-44" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NormalNav;
