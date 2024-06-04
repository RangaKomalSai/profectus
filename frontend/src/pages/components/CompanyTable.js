import React, { useEffect, useState } from "react";
import axios from "axios";

function CompanyTable() {
  const [applications, setApplications] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/company/applications`
        );
        setApplications(response.data.applications || []);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center rounded-2xl text-center pt-24 p-10">
      <div className="w-full overflow-x-auto">
        <table className="table bg-white border-collapse rounded-2xl shadow-md w-full my-8">
          <thead className="table__head bg-gray-200">
            <tr className="table__row">
              <th className="table__header py-4">Preference No</th>
              <th className="table__header py-4">Roll No</th>
              <th className="table__header py-4">Candidate Name</th>
              <th className="table__header py-4">Resume Link</th>
              <th className="table__header py-4">Status</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {applications.map((student, index) => (
              <tr className="table__row hover:bg-gray-100" key={index}>
                <td
                  className="table__data px-4 py-2 md:py-4 text-center"
                  data-aos="fade-right"
                  data-title="Preference no"
                >
                  {student.preferenceNumber}
                </td>
                <td
                  className="table__data px-4 py-2 md:px-6 md:py-4"
                  data-aos="fade-right"
                  data-title="Roll No"
                >
                  {student.rollNumber}
                </td>
                <td
                  className="table__data px-4 py-2 md:px-6 md:py-4"
                  data-aos="fade-left"
                  data-title="Candidate Name"
                >
                  {student.name}
                </td>
                <td
                  className="table__data px-4 py-2 md:px-6 md:py-4"
                  data-aos="fade-left"
                  data-title="Resume Link"
                >
                  <a
                    href={student.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </td>
                <td
                  className="table__data px-4 py-2 md:px-6 md:py-4"
                  data-aos="fade-left"
                  data-title="Status"
                >
                  <button className="bg-blue-600 gap-1 relative h-8 w-24 md:h-10 md:w-32 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-32 before:hover:w-32 hover:before:opacity-80">
                    <span className="relative z-100">Accept</span>
                  </button>
                  <button className="bg-red-600 relative h-8 w-24 md:h-10 md:w-32 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-32 before:hover:w-32 hover:before:opacity-80">
                    <span className="relative z-100">Reject</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyTable;
