import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CompanyTable from "../pages/components/CompanyTable.js";
import ResponsiveCompanyNav from "../pages/components/ResponsiveCompanyNav.tsx";

function CompanyDashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Verify company authentication
    axios.get("http://localhost:5000/auth/verify-company").then((res) => {
      if (!res.data.status) {
        navigate("/login/company");
      }
      console.log(res.data);
    });
  }, [navigate]);

  return (
    <div className="bg-gradient-to-b from-[#0C0C33] to-[#050145] min-h-screen">
      <ResponsiveCompanyNav />
      <div className="text-wrap text-xl text-white font-outfit pt-32 text-center pr-4 pl-4">
        Hey, There! These are the applicants for your company.
      </div>
      <CompanyTable />
    </div>
  );
}

export default CompanyDashboard;
