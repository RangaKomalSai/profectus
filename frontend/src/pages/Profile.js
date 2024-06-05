import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./components/ProfileCard.js";
import ResponsiveDashNav from "./components/ResponsiveDashNav.tsx";
import DisplayTable from "./components/DisplayTable.tsx";
import { API_URL } from "../utils/apiConfig.js";

function Profile() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get(`${API_URL}/auth/verify-student`, {
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
      <ResponsiveDashNav />
      <ProfileCard />
      <div className="mt-8">
        <DisplayTable />
      </div>
    </div>
  );
}

export default Profile;
