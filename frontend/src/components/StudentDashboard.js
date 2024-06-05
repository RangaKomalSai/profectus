import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResponsiveDashNav from "../pages/components/ResponsiveDashNav.tsx";
import Rules from "../pages/components/Rules.tsx";
import { API_URL } from "../utils/apiConfig.js";

function StudentDashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get(`${API_URL}/api/auth/verify-student`, {
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
    <div className="bg-gradient-to-b from-[#0C0C33] to-[#050145] min-h-screen">
      <ResponsiveDashNav />
      <Rules />
    </div>
  );
}

export default StudentDashboard;
