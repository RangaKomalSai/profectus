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
        className={`text-white ${navOpenStyle} fixed flex items-center justify-center flex-col h-[100%] transform transition-all duration-300 delay-300 font-outfit w-4/5 md:w-[60%] bg-blue-900 space-y-14 z-[1009]`}
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
            offset={-80}
            duration={500}
            className="nav_link text-[25px] sm:text-[30px] text-white"
            onClick={handleClick}
          >
            About
          </Link>
        </li>
        <li className="hover: cursor-pointer">
          <Link
            to="testimonials"
            smooth={true}
            offset={-80}
            duration={500}
            className="nav_link text-[25px] sm:text-[30px] text-white"
            onClick={handleClick}
          >
            Testimonials
          </Link>
        </li>
        <li>
          <Link
            to="contact"
            smooth={true}
            offset={-80}
            duration={500}
            className="nav_link text-[25px] sm:text-[30px] text-white"
            onClick={handleClick}
          >
            Contact us
          </Link>
        </li>
        <button
          onClick={handleLogin}
          className="bg-orange-600 relative h-10 w-32 md:h-12 md:w-40 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 before:hover:w-40 hover:before:opacity-80"
        >
          <span className="relative z-100 font-bold font-outfit tracking-wider">
            LOGIN
          </span>
        </button>

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
