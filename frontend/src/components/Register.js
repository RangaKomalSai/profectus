import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

function Register() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    rollNumber: "",
    department: "",
    programmeOfStudy: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rollNumber") {
      const lowerCaseValue = value.toLowerCase();
      setRollNumber(lowerCaseValue);
      setFormData({ ...formData, [name]: lowerCaseValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "department") {
      setSelectedDepartment(value !== "");
    }
    if (name === "programmeOfStudy") {
      setSelectedProgramme(value !== "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate empty fields
    for (const key in formData) {
      if (!formData[key]) {
        setErrorMessage("Please fill out all fields");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      }
    }

    // Validate phone number
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(formData.contactNumber)) {
      setErrorMessage("Contact number must be a 10-digit number");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    // Check if department and programme are selected
    if (!selectedDepartment || !selectedProgramme) {
      setErrorMessage("Please select your department and programme of study");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        formData,
        { withCredentials: true }
      );
      if (response.data.status) {
        console.log(response.data);

        setErrorMessage("");

        // Clear password fields after submission
        setFormData({
          ...formData,
          password: "",
          confirmPassword: "",
        });

        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setErrorMessage("");
          navigate("/login/student/verify-otp", {
            state: { email: response.data.email },
          });
        }, 5000);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage(error.response.data.message || "An error occurred");
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
              disabled={isLoading}
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="contactNumber"
              onChange={handleChange}
              placeholder="Contact Number"
              disabled={isLoading}
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="rollNumber"
              onChange={handleChange}
              autoCapitalize="characters"
              placeholder="Roll Number"
              disabled={isLoading}
              className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              className={`w-full ${
                selectedDepartment ? "text-black" : "text-gray-400"
              } p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              name="department"
              disabled={isLoading}
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
              className={`w-full ${
                selectedProgramme ? "text-black" : "text-gray-400"
              } p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              name="programmeOfStudy"
              disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                disabled={isLoading}
                className="mr-2"
              />
              <label htmlFor="agree" className="text-md">
                I confirm that all the information I have provided is true and
                accurate.{" "}
              </label>
            </div>
            <button
              type="submit"
              disabled={!isAgreed || isLoading}
              className={`w-full p-4 rounded-md font-bold ${
                isAgreed
                  ? "bg-black text-white"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="loader"></div>{" "}
              {/* Replace with your loading spinner */}
            </div>
          )}
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

export default Register;
