import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from "../../images/white_abhyuday_2.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      className="h-1/2 w-full flex md:flex-row flex-col justify-around items-start pt-20 pr-20 pb-20 pl-5 lg:p-20"
      style={{
        background:
          "radial-gradient(circle 0px at right top, rgba(35, 121, 171, 0.5), transparent), radial-gradient(circle 0px at left bottom, rgba(35, 121, 171, 0.5), transparent), linear-gradient(to bottom, rgba(35, 121, 171, 0.5), transparent), #0C0C2E",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="p-5 md:max-w-sm lg:max-w-md">
        <ul>
          <img
            src={logo}
            alt="Logo"
            width={296}
            height={176}
            className="pb-4"
          />
          <li className="text-gray-500 text-md pb-2 font-semibold text-pretty">
            Abhyuday, IIT Bombay is Asia's largest student run&nbsp;
            organization&nbsp; working&nbsp; towards&nbsp; creating a
            sense&nbsp; of Social&nbsp; Responsibility and Leadership among the
            youth of India.
          </li>
          {/* <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Abhyuday, IIT Bombay is Asia's largest student <br /> run &nbsp; organization &nbsp; working &nbsp; towards &nbsp; creating a <br /> sense &nbsp; of Social &nbsp; Responsibility and Leadership <br /> among the youth of India.
          </li> */}
          <li className="font-bold pb-4">
            Inspiring Individuals, Transforming Communities
          </li>
          <div className="flex gap-6 pb-5">
            <Link
              to="https://www.instagram.com/iitbombay_abhyuday/"
              target="_blank"
            >
              <FaInstagram className="text-2xl cursor-pointer hover:text-pink-500" />
            </Link>
            <Link to="https://x.com/Abhyuday_IITB" target="_blank">
              <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
            </Link>
            <Link
              to="https://www.linkedin.com/company/abhyuday-iit-bombay/"
              target="_blank"
            >
              <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
            </Link>
            <Link to="https://youtube.com/@abhyudayiitbombay" target="_blank">
              <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
            </Link>
          </div>
        </ul>
      </div>
      <div className="p-5">{/* Your content here */}</div>
      <div className="p-5">
        <ul>
          <p className="text-gray-20 font-bold text-2xl pb-4">QUICK LINKS</p>
          <li className="text-gray-50 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            <Link to="https://www.abhyudayiitb.org" target="_blank">
              Abhyuday
            </Link>
          </li>
          {/* <li className="text-gray-50 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
          <Link to="https://www.abhyudayiitb.org">CR Program</Link>
          </li> */}
          <li className="text-gray-50 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            <Link to="https://abhyudayiitb.org/events.html" target="_blank">
              Events
            </Link>
          </li>
          <li className="text-gray-50 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            <Link to="https://abhyudayiitb.org/campaigns.html" target="_blank">
              Campaigns
            </Link>
          </li>
          <li className="text-gray-50 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            <Link
              to="https://abhyudayiitb.org/competitions.html"
              target="_blank"
            >
              Competitions
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-5">
        <ul>
          <p className="text-gray-20 font-bold text-2xl pb-4">REACH OUT</p>
          <li className="text-gray-50 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            <Link
              to="https://maps.app.goo.gl/seG6qxwWHYLZWjrG7"
              target="_blank"
            >
              Abhyuday Office, <br />
              Student Activity <br />
              Centre (SAC), <br />
              IIT Bombay, <br />
              Powai, <br />
              Mumbai, India
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
