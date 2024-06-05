import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NormalNav from "../pages/components/NormalNav.tsx";
import { API_URL } from "../utils/apiConfig.js";

function ForgotPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate empty fields
    let hasEmptyField = false;

    for (const key in formData) {
      if (!formData[key]) {
        hasEmptyField = true;
        break;
      }
    }

    if (hasEmptyField) {
      toast.error("Please fill out all fields");
      return;
    }

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      axios.defaults.withCredentials = true;
      await axios
        .post(`${API_URL}/auth/reset-password/` + token, formData)
        .then((response) => {
          if (response.data.status) {
            toast.success("Password changed successfully");
            setTimeout(() => {
              navigate("/login/student");
            }, 1000);
          }
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        }); // Handle success response
    } catch (error) {
      console.error(error.response.data); // Handle error message
      toast.error(error.response.data.message || "An error occurred");
      // setErrorMessage(error.response.data.message || "An error occurred");
    }
  };

  return (
    <>
      <NormalNav />
      <div className="bg-gradient-to-b from-[#0C0C33] to-[#247FB2] min-h-screen flex justify-center items-center text-white py-20">
        <div
          className="bg-white bg-opacity-60 text-black p-8 md:p-8 rounded-lg shadow-lg lg:max-w-2xl md:max-w-lg lg:mx-4 mx-8"
          data-aos="zoom-in-up"
        >
          <h2 className="text-center text-3xl font-outfit font-bold mb-6">
            RESET PASSWORD
          </h2>
          <form className="space-y-8 font-roboto" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i
                className={`fi ${
                  passwordVisible ? "fi-rs-crossed-eye" : "fi-rs-eye"
                } absolute right-6 top-4 cursor-pointer text-xl`}
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></i>
            </div>

            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i
                className={`fi ${
                  confirmPasswordVisible ? "fi-rs-crossed-eye" : "fi-rs-eye"
                } absolute right-6 top-4 cursor-pointer text-xl`}
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              ></i>
            </div>
            <button
              type="submit"
              className={
                "w-full p-4 rounded-md font-roboto font-bold bg-black text-white "
              }
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
