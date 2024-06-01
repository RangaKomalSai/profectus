import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Replace next/link with react-router-dom
import ablogo from "../../images/white_abhyuday_2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import RulesModal from "./RulesModal.tsx";

const DashNav = ({ openNav }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          toast.success("Logged out successfully");
          navigate("/login/student");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRulesClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [navSticky, setNavSticky] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) {
        setNavSticky(true);
      }
      if (window.scrollY <= 90) {
        setNavSticky(false);
      }
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const rules = [
    "Rule 1: Follow the guidelines.",
    "Rule 2: Maintain discipline.",
    "Rule 3: Respect deadlines.",
    "Rule 4: Be honest and transparent.",
    "Rule 5: Collaborate effectively.",
    "Rule 1: Follow the guidelines.",
    "Rule 2: Maintain discipline.",
    "Rule 3: Respect deadlines.",
    "Rule 4: Be honest and transparent.",
    "Rule 5: Collaborate effectively.",
    "Rule 1: Follow the guidelines.",
    "Rule 2: Maintain discipline.",
    "Rule 3: Respect deadlines.",
    "Rule 4: Be honest and transparent.",
    "Rule 5: Collaborate effectively.",
    "Rule 1: Follow the guidelines.",
    "Rule 2: Maintain discipline.",
    "Rule 3: Respect deadlines.",
    "Rule 4: Be honest and transparent.",
    "Rule 5: Collaborate effectively.",
  ];

  return (
    <>
      <div
        className={`fixed w-full transition-all duration-200 z-[1000] ${
          navSticky ? "bg-gradient-to-b from-[#1d1d6d] to-[#071823]" : "bg-nav"
        }`}
      >
        <div className="flex items-center h-[10vh] lg:h-[12vh] justify-between w-4/5 mx-auto">
          <div className="font-bold text-white text-2xl">
            <Link to="/student-dashboard">
              <img src={ablogo} alt="Logo" className="w-32 md:w-48" />
            </Link>
          </div>
          <ul className="lg:flex hidden items-center space-x-10 lg:space-x-12 xl:space-x-14">
            <li className="hover: cursor-pointer">
              <Link to="/student-dashboard" className="nav_link">
                Home
              </Link>
            </li>
            <li className="hover: cursor-pointer">
              <Link to="#" className="nav_link" onClick={handleRulesClick}>
                Rules
              </Link>
            </li>
            <li className="hover: cursor-pointer">
              <Link to="/profile" className="nav_link">
                Profile
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-6">
            <button
              onClick={handleClick}
              className="bg-orange-600 relative h-10 w-32 md:h-12 md:w-40 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 before:hover:w-40 hover:before:opacity-80 hidden md:block"
            >
              <span className="relative z-100 font-bold font-nunito tracking-wider">
                LOGOUT
              </span>
            </button>
            <FontAwesomeIcon
              icon={faBars}
              onClick={openNav}
              className="w-8 h-8 md:w-[2.3rem] md:h-[2.3rem] lg:hidden text-white rotate-180"
            />
          </div>
        </div>
      </div>
      <RulesModal show={isModalOpen} onClose={handleCloseModal} rules={rules} />
    </>
  );
};

export default DashNav;
