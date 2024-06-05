import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Replace next/link with react-router-dom
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import RulesModal from "./RulesModal.tsx";
import { API_URL } from "../../utils/apiConfig.js";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileDashNav = ({ closeNav, showNav }: Props) => {
  const navOpenStyle = showNav ? "translate-x-0" : "translate-x-[-100%]";
  const navigate = useNavigate();

  const handleClick = () => {
    closeNav();
  };
  const handleProfile = () => {
    closeNav();
  };
  const handleHome = () => {
    closeNav();
    window.scrollTo(0, 0);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios
      .get(`${API_URL}/api/auth/logout`)
      .then((res) => {
        if (res.data.status) {
          toast.success("Logged out successfully");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRulesClick = () => {
    closeNav();
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
    "A report of each fellow would be submitted to the Dean of student affairs at the end of their fellowship tenure.",

    "Candidate must upload a drive link in which the one page resume and two page resume should be present in a PDF format.",

    "The PDF file name must be Roll_Number.pdf where 'Roll_Number' is your IIT Bombay enrolled roll number.",
    "If a candidate is found to be involved in any malpractices during the fellowship duration, quits the fellowship before completing the designated duration, or rejects the fellowship after accepting it, this will result in bad remarks being noted in their final report, which will be sent to the Dean of Student Affairs.",

    "Students can use RESUME RESOURCES to create a PDF resume following all guidelines.",

    "Students applying through Profectus  must not approach startups outside the portal. Violators will be blacklisted.",
    "Selected students will receive an offer letter and must respond to confirm their availability. Failure to respond will be taken as non-availability, resulting in the application being dropped.",

    "The shortlist will be posted in the blog section of the website and the interview schedule will be emailed.",
  ];

  return (
    <>
      <div>
        <div
          className={`fixed ${navOpenStyle} top-0 left-0 right-0 bottom-0 transition-all duration-500 z-[1000] bg-black opacity-70 h-screen`}
        ></div>

        <ul
          className={`text-white ${navOpenStyle} fixed flex items-center justify-center flex-col h-[100%] transform transition-all duration-300 delay-300 w-4/5 md:w-[60%] bg-blue-900 space-y-14 z-[1009] font-outfit`}
        >
          <button
            onClick={handleLogout}
            className="bg-orange-600 relative h-10 w-32 md:h-12 md:w-40 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 before:hover:w-40 hover:before:opacity-80"
          >
            <span className="relative z-100 font-bold font-outfit tracking-wider">
              LOGOUT
            </span>
          </button>

          <FontAwesomeIcon
            icon={faXmark}
            onClick={closeNav}
            className="absolute top-[-1.4rem] right-[1.4rem] w-[2.2rem] h-[2.2rem] text-white"
          />
        </ul>
      </div>
      <RulesModal show={isModalOpen} onClose={handleCloseModal} rules={rules} />
    </>
  );
};

export default MobileDashNav;
