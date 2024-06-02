import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.js";
import { useEffect } from "react";
import Home from "./pages/Home.js";
import Register from "./components/Register.js";
import LoginStudent from "./components/LoginStudent.js";
import VerifyOTP from "./components/VerifyOTP.js";
import ForgotPassword from "./components/ForgotPassword.js";
import ResetPassword from "./components/ResetPassword.js";
import LoginCompany from "./components/LoginCompany.js";
import StudentDashboard from "./components/StudentDashboard.js";
import CompanyDashboard from "./components/CompanyDashboard.js";
import PageNotFound from "./components/PageNotFound.js";
import AOS from "aos";
import "aos/dist/aos.css";
import Profile from "./pages/Profile.js";

function App() {
  useEffect(() => {
    const initAOS = async () => {
      const AOS = (await import("aos")).default;
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: false,
        anchorPlacement: "top-bottom",
      });
    };

    initAOS();
    AOS.refresh();
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Home />}
          errorElement={<PageNotFound />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login/student" element={<LoginStudent />}></Route>
        <Route path="/login/student/verify-otp" element={<VerifyOTP />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/login/company" element={<LoginCompany />}></Route>
        <Route path="/student-dashboard" element={<StudentDashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/company-dashboard" element={<CompanyDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
