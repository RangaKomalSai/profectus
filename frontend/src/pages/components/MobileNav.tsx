import React from "react";
import { Link } from "react-scroll"; // Replace next/link with react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
  const navOpenStyle = showNav ? "translate-x-0" : "translate-x-[-100%]";
  const navigate = useNavigate();
  const handleClick = () => {
    closeNav();
  };
  const handleLogin = () => {
    closeNav();
    navigate("/login/student");
  };

  return (
    <div>
      <div
        className={`fixed ${navOpenStyle} top-0 left-0 right-0 bottom-0 transition-all duration-500 z-[1000] bg-black opacity-70 h-screen`}
      ></div>

      <ul
        className={`text-white ${navOpenStyle} fixed flex items-center justify-center flex-col h-[100%] transform transition-all duration-300 delay-300 w-4/5 md:w-[60%] bg-blue-900 space-y-14 z-[1009]`}
      >
        <li>
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="nav_link text-[25px] sm:text-[30px] text-white"
            onClick={handleClick}
          >
            Home
          </Link>
        </li>
        <li className="hover: cursor-pointer">
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="nav_link text-[25px] sm:text-[30px] text-white"
            onClick={handleClick}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="nav_link text-[25px] sm:text-[30px] text-white"
            onClick={handleClick}
          >
            Contact
          </Link>
        </li>
        <li
          className="hover: cursor-pointer text-[25px] sm:text-[30px] text-white"
          onClick={handleLogin}
        >
          LOGIN
        </li>

        <FontAwesomeIcon
          icon={faXmark}
          onClick={closeNav}
          className="absolute top-[-1.4rem] right-[1.4rem] w-[2.2rem] h-[2.2rem] text-white"
        />
      </ul>
    </div>
  );
};

export default MobileNav;
