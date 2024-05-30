import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyDashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/auth/verify-company").then((res) => {
      if (res.data.status) {
      } else {
        navigate("/login/company");
      }
      console.log(res.data);
    });
  }, []);

  const handleLogout = () => {
    console.log("clicked");
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login/company");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>CompanyDashboard</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default CompanyDashboard;
