import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
    for (const key in formData) {
      if (!formData[key]) {
        setErrorMessage("Email field is required");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        formData
      );

      if (response.data.status) {
        console.log("success");
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setErrorMessage("");
          navigate("/login/student");
        }, 5000);
      } else {
        setErrorMessage(response.data.message || "An error occurred");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error(error.response?.data); // Log the error response
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      {errorMessage && ( // Conditionally render error message
        <div className="bg-red-500 text-white p-4 fixed w-full text-center">
          {errorMessage}
        </div>
      )}
      {successMessage && ( // Conditionally render error message
        <div className="bg-green-500 text-white p-4 fixed w-full text-center">
          {successMessage}
        </div>
      )}
      <div className="bg-gradient-to-b from-[#0C0C33] to-[#247FB2] min-h-screen flex justify-center items-center text-white py-20">
        <div className="bg-white bg-opacity-60 text-black p-8 md:p-8 rounded-lg shadow-lg lg:max-w-2xl md:max-w-lg lg:mx-4 mx-8">
          <h2 className="text-center text-3xl font-crimson font-bold mb-6">
            FORGOT PASSWORD
          </h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
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
              {isLoading ? "Sending..." : "Send Email"}
            </button>
          </form>
          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
