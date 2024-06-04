// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function CompanyDashboard() {
//   const navigate = useNavigate();
//   axios.defaults.withCredentials = true;
//   useEffect(() => {
//     axios.get("http://localhost:5000/auth/verify-company").then((res) => {
//       if (res.data.status) {
//       } else {
//         navigate("/login/company");
//       }
//       console.log(res.data);
//     });
//   }, []);

//   const handleLogout = () => {
//     console.log("clicked");
//     axios.defaults.withCredentials = true;
//     axios
//       .get("http://localhost:5000/auth/logout")
//       .then((res) => {
//         if (res.data.status) {
//           navigate("/login/company");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <div>CompanyDashboard</div>
//       <button onClick={handleLogout}>Logout</button>
//     </>
//   );
// }

// export default CompanyDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function CompanyDashboard({ companyId }) {
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState([]);

//   axios.defaults.withCredentials = true;

//   useEffect(() => {
//     axios.get("http://localhost:5000/auth/verify-company").then((res) => {
//       if (!res.data.status) {
//         navigate("/login/company");
//       }
//     });
//   }, [navigate]);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/company/applications`
//         );
//         setProfileData(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     fetchProfileData();
//   }, [companyId]);

//   const handleLogout = () => {
//     axios
//       .get("http://localhost:5000/auth/logout")
//       .then((res) => {
//         if (res.data.status) {
//           navigate("/login/company");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <div>CompanyDashboard</div>

//       <div className="container mx-auto flex flex-col items-center rounded-2xl text-center">
//         <div className="w-full overflow-x-auto">
//           <table className="table bg-white border-collapse rounded-2xl shadow-md w-full my-8">
//             <thead className="table__head bg-gray-200">
//               <tr className="table__row">
//                 <th className="table__header py-4">Preference No</th>
//                 <th className="table__header py-4">Roll No</th>
//                 <th className="table__header py-4">Candidate Name</th>
//                 <th className="table__header py-4">Resume Link</th>
//                 <th className="table__header py-4">Status</th>
//               </tr>
//             </thead>
//             <tbody className="table__body">
//               {profileData.map((student, index) => (
//                 <tr className="table__row hover:bg-gray-100" key={index}>
//                   <td
//                     className="table__data px-4 py-2 md:py-4 text-center"
//                     data-aos="fade-right"
//                     data-title="Preference no"
//                   >
//                     {student.preferenceNumber}
//                   </td>
//                   <td
//                     className="table__data px-4 py-2 md:px-6 md:py-4"
//                     data-aos="fade-right"
//                     data-title="Roll No"
//                   >
//                     {student.rollNumber}
//                   </td>
//                   <td
//                     className="table__data px-4 py-2 md:px-6 md:py-4"
//                     data-aos="fade-left"
//                     data-title="Candidate Name"
//                   >
//                     {student.name}
//                   </td>
//                   <td
//                     className="table__data px-4 py-2 md:px-6 md:py-4"
//                     data-aos="fade-left"
//                     data-title="Resume Link"
//                   >
//                     <a
//                       href={student.resumeLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {student.resume}
//                     </a>
//                   </td>
//                   <td
//                     className="table__data px-4 py-2 md:px-6 md:py-4"
//                     data-aos="fade-left"
//                     data-title="Status"
//                   >
//                     <button className="bg-blue-600 gap-1 relative h-8 w-24 md:h-10 md:w-32 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-32 before:hover:w-32 hover:before:opacity-80">
//                       <span className="relative z-100">Accept</span>
//                     </button>
//                     <button className="bg-red-600 relative h-8 w-24 md:h-10 md:w-32 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-32 before:hover:w-32 hover:before:opacity-80">
//                       <span className="relative z-100">Reject</span>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <button onClick={handleLogout}>Logout</button>
//     </>
//   );
// }

// export default CompanyDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyDashboard({ companyId }) {
  const navigate = useNavigate();
  const [rollNumbers, setRollNumbers] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:5000/auth/verify-company").then((res) => {
      if (!res.data.status) {
        navigate("/login/company");
      }
    });
  }, [navigate]);

  useEffect(() => {
    const fetchRollNumbers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/company/applications`
        );
        const extractedRollNumbers = response.data.rollNumbers || []; // Handle empty rollNumbers array
        setRollNumbers(extractedRollNumbers);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchRollNumbers();
  }, [companyId]);

  const handleLogout = () => {
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

      <div className="container mx-auto">
        {/* List of roll numbers */}
        <ul className="list-disc px-4">
          {rollNumbers.map((rollNumber, index) => (
            <li key={index}>{rollNumber}</li>
          ))}
          {rollNumbers.length === 0 && <li>No applications found.</li>}
        </ul>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default CompanyDashboard;
