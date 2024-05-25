import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function StudentLoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("student");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    navigate(`/login/${tab}`);
  };

  return (
    <div className="bg-gradient-to-b from-[#0C0C33] to-[#247FB2] min-h-screen flex justify-center items-center text-white py-20">
      <div className="bg-white bg-opacity-60 text-black p-8 md:p-8 rounded-lg shadow-lg w-full lg:max-w-2xl md:max-w-lg lg:mx-4 mx-8">
        <div className="flex justify-center space-x-2 p-4 mb-6">
          <button
            onClick={() => handleTabClick("student")}
            className={`text-2xl font-crimson font-bold px-8 py-4 rounded-md transition-colors duration-300 ${
              selectedTab === "student"
                ? "bg-black text-white border border-white"
                : "bg-white text-black"
            }`}
          >
            STUDENT LOGIN
          </button>
          <button
            onClick={() => handleTabClick("company")}
            className={`text-2xl font-crimson font-bold px-8 py-4 rounded-md transition-colors duration-300 ${
              selectedTab === "company"
                ? "bg-black text-white border border-white"
                : "bg-white text-black"
            }`}
          >
            COMPANY LOGIN
          </button>
        </div>
        <form className="space-y-8">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i
              className={`fi ${
                passwordVisible ? "fi-rs-crossed-eye" : "fi-rs-eye"
              } absolute right-6 top-4 cursor-pointer text-xl`}
              onClick={() => setPasswordVisible(!passwordVisible)}
            ></i>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-4 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default StudentLoginPage;
