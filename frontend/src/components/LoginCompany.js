import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NormalNav from "../pages/components/NormalNav.tsx";

function LoginCompany() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/auth/verify-company").then((res) => {
      if (res.data.status) {
        navigate("/company-dashboard");
      } else {
      }
      console.log(res.data);
    });
  }, []);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("company");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    navigate(`/login/${tab}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login/company",
        formData
      );
      // .then((response) => {
      //   if (response.data.status) {
      //   }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      console.log(response.data); // Handle success response
      navigate("/company-dashboard");
    } catch (error) {
      console.error(error.response.data); // Handle error message
      // setErrorMessage(error.response.data.message || "An error occurred");
      toast.error(error.response.data.message || "An error occurred"); // Handle error message
    }
  };

  return (
    <>
      <NormalNav />
      <div className="bg-gradient-to-b from-[#0C0C33] to-[#247FB2] min-h-screen flex justify-center items-center text-white py-20">
        <div
          className="bg-white bg-opacity-60 text-black p-8 md:p-8 rounded-lg shadow-lg w-full lg:max-w-2xl md:max-w-lg sm:m-6 lg:mx-4 mx-8"
          data-aos="zoom-in-up"
        >
          <div className="flex justify-center space-x-2 p-4 mb-6">
            <button
              onClick={() => handleTabClick("student")}
              className={`text-md md:text-2xl font-crimson font-bold px-8 py-4 rounded-md transition-colors duration-300 ${
                selectedTab === "student"
                  ? "bg-black text-white border border-white"
                  : "bg-white bg-opacity-60 text-gray-500 hover:bg-opacity-100 hover:text-black"
              }`}
            >
              STUDENT LOGIN
            </button>
            <button
              onClick={() => handleTabClick("company")}
              className={`text-md md:text-2xl font-crimson font-bold px-8 py-4 rounded-md transition-colors duration-300 ${
                selectedTab === "company"
                  ? "bg-black text-white border border-white"
                  : "bg-white bg-opacity-60 text-gray-500 hover:bg-opacity-100 hover:text-black"
              }`}
            >
              COMPANY LOGIN
            </button>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
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
        </div>
      </div>
    </>
  );
}

export default LoginCompany;
