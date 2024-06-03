import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NormalNav from "../pages/components/NormalNav.tsx";

function LoginStudent() {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/verify-student", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/student-dashboard");
        } else {
        }
        console.log(res.data);
      });
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedTab, setSelectedTab] = useState("student");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ldap: "",
    password: "",
  });

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    navigate(`/login/${tab}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const lowerCaseValue = value.toLowerCase();
      setEmail(lowerCaseValue);
      setFormData({ ...formData, [name]: lowerCaseValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login/student",
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

      navigate("/student-dashboard");
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
          <div className="flex justify-center space-x-2 p-4 mb-6 font-outfit">
            <button
              onClick={() => handleTabClick("student")}
              className={`text-md md:text-2xl font-bold px-8 py-4 rounded-md transition-colors duration-300 ${
                selectedTab === "student"
                  ? "bg-black text-white border border-white"
                  : "bg-white text-black"
              }`}
            >
              STUDENT LOGIN
            </button>
            <button
              onClick={() => handleTabClick("company")}
              className={`text-md md:text-2xl font-bold px-8 py-4 rounded-md transition-colors duration-300 ${
                selectedTab === "company"
                  ? "bg-black text-white border border-white"
                  : "bg-white bg-opacity-60 text-gray-500 hover:bg-opacity-100 hover:text-black"
              }`}
            >
              COMPANY LOGIN
            </button>
          </div>
          <form className="space-y-8 font-roboto" onSubmit={handleSubmit}>
            <input
              type="email"
              name="ldap"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your LDAP email address"
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
          <div className="flex justify-end mt-2 font-roboto">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <p className="text-center mt-6 font-roboto">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginStudent;
