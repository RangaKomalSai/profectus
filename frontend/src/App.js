import React from "react";
import Home from "./pages/Home.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.js";
import PageNotFound from "./pages/PageNotFound.js";
import StudentLoginPage from "./pages/StudentLoginPage.js";
import CompanyLoginPage from "./pages/CompanyLoginPage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login/student",
    element: <StudentLoginPage />,
  },
  {
    path: "/login/company",
    element: <CompanyLoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
