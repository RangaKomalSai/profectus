import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashNav from "../pages/components/DashNav.tsx";
import Rules from "../pages/components/Rules.tsx";

function StudentDashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/verify-student", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status) {
        } else {
          navigate("/login/student");
        }
        console.log(res.data);
      });
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#0C0C33] to-[#247FB2] min-h-screen">
      <DashNav />
      <Rules />
    </div>
  );
}

export default StudentDashboard;
