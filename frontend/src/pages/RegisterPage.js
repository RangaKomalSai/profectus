import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const departments = [
  "Aerospace Engineering",
  "Biosciences and Bioengineering",
  "Centre of Studies in Resources Engineering (CSRE)",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Computer Science & Engineering",
  "Earth Sciences",
  "Electrical Engineering",
  "Energy Science and Engineering",
  "Environmental Science and Engineering",
  "Humanities & Social Science",
  "Economics",
  "Industrial Design Centre",
  "Industrial Engineering and Operations Research(IEOR)",
  "Mathematics",
  "Mechanical Engineering",
  "Metallurgical Engineering & Materials Science",
  "System and Control Engineering",
  "Physics",
  "Shailesh J. Mehta School of Management",
];

const programmeOfStudy = [
  "Undergraduate(UG)",
  "Postgraduate(PG)",
  "Doctorate(PhD)",
];

function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    rollNumber: "",
    department: "",
    programmeOfStudy: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");

      // Clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
      console.log(response.data); // Handle success message
      setErrorMessage("");
    } catch (error) {
      console.error(error.response.data); // Handle error message
      setErrorMessage(error.response.data.message || "An error occurred");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      {errorMessage && ( // Conditionally render error message
        <div className="bg-red-500 text-white p-4 fixed w-full text-center">
          {errorMessage}
        </div>
      )}
      <div className="bg-gradient-to-b from-[#0C0C33] to-[#247FB2] min-h-screen flex justify-center items-center text-white py-20">
        <div className="bg-white bg-opacity-60 text-black p-8 md:p-8 rounded-lg shadow-lg w-full lg:max-w-2xl md:max-w-lg lg:mx-4 mx-8">
          <h2 className="text-center text-3xl font-crimson font-bold mb-6">
            REGISTER
          </h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="contactNumber"
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="rollNumber"
              onChange={handleChange}
              placeholder="Roll Number"
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              className="w-full text-gray-400 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="department"
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Choose your Department
              </option>
              {departments.map((department, index) => (
                <option
                  key={index}
                  value={department}
                  style={{ color: "black", width: "100%" }}
                >
                  {department}
                </option>
              ))}
            </select>
            <select
              className="w-full text-gray-400 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="programmeOfStudy"
              onChange={handleChange}
            >
              <option value="" disabled selected style={{ color: "black" }}>
                Programme of Study
              </option>
              {programmeOfStudy.map((programme, index) => (
                <option
                  key={index}
                  value={programme}
                  style={{ color: "black" }}
                >
                  {programme}
                </option>
              ))}
            </select>
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
              className="w-full bg-black text-white p-4 rounded-md"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login/student" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
