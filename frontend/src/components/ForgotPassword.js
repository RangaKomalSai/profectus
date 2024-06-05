import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NormalNav from "../pages/components/NormalNav.tsx";
import { API_URL } from "../utils/apiConfig.js";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        formData
      );

      if (response.data.status) {
        console.log("success");
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login/student");
        }, 2000);
      } else {
        // setErrorMessage(response.data.message || "An error occurred");
        toast.error(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error(error.response?.data); // Log the error response
      // setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false); // Set loading state to false
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
            FORGOT PASSWORD
          </h2>
          <form className="space-y-8 font-roboto" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your LDAP Email Id"
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={"w-full p-4 rounded-md font-bold bg-black text-white "}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="loader mr-2"></div>
                  Sending...
                </div>
              ) : (
                "Send Email"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
