import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import NormalNav from "../pages/components/NormalNav.tsx";

function VerifyOTP() {
  // const navigate = useNavigate();
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

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value; // Save value at correct index

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus(); // move focus to next input
    }

    setOtp(newOtp); // update state
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = ""; // clear prev digit
      inputRefs.current[index - 1].focus(); // focus prev digit
      setOtp(newOtp); // update state
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();

    // console.log(otpCode); // Combine OTP digits into a single string

    try {
      const otpCode = otp.join("");
      const email = location.state?.email || "";
      console.log(email, otpCode);
      const response = await axios.post(
        "http://localhost:5000/auth/verify-otp",
        {
          email,
          otp: otpCode,
        }
      );
      console.log(response.data.message); // Handle success message

      navigate("/student-dashboard"); // Redirect to dashboard on successful verification
    } catch (error) {
      console.error(error.response?.data?.message || error.message); // Handle error message
      // setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred");
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
          <h2 className="text-center text-3xl font-outfit font-bold mb-2">
            OTP Verification
          </h2>

          <div className="flex justify-center mb-4 text-gray-600 font-roboto">
            Please enter the OTP sent to your LDAP Email Id
          </div>
          <div className="flex justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                className="w-16 h-16 mr-3 text-center text-lg rounded-xl"
                type="text"
                maxLength={1}
                value={digit}
                autoFocus={index === 0}
                ref={(ref) => (inputRefs.current[index] = ref)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleVerify}
            className="w-full p-4 rounded-md font-roboto font-bold bg-black text-white m-2 mt-4"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </>
  );
}

export default VerifyOTP;
