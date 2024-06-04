import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ConfirmModal from "./ConfirmModal.tsx";

function CompanyTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/company/applications`
        );
        setApplications(response.data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleAccept = (rollNumber) => {
    setAccepted((prevAccepted) =>
      prevAccepted.includes(rollNumber)
        ? prevAccepted
        : [...prevAccepted, rollNumber]
    );
    setRejected((prevRejected) =>
      prevRejected.filter((rn) => rn !== rollNumber)
    );
    toast.success("Application accepted");
  };

  const handleReject = (rollNumber) => {
    setRejected((prevRejected) =>
      prevRejected.includes(rollNumber)
        ? prevRejected
        : [...prevRejected, rollNumber]
    );
    setAccepted((prevAccepted) =>
      prevAccepted.filter((rn) => rn !== rollNumber)
    );
    toast.error("Application rejected");
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);

    try {
      console.log(accepted);
      console.log(rejected);
      const response = await axios.post(
        "http://localhost:5000/api/company/confirm-applications",
        {
          accepted,
          rejected,
        }
      );
      if (response.data.status) {
        toast.success(response.data.message);
        const updatedApplications = await axios.get(
          `http://localhost:5000/api/company/applications`
        );
        setApplications(updatedApplications.data.applications || []);
        setConfirmButtonDisabled(true);
      } else {
        console.error("Error confirming changes:", response.data.message);
      }
    } catch (error) {
      console.error("Error confirming changes:", error);
    }
  };

  return (
    <>
      <div>
        <div className="container mx-auto flex flex-col items-center rounded-2xl text-center p-10">
          <div className="w-full overflow-x-auto">
            <table className="table bg-white border-collapse rounded-2xl shadow-md w-full my-8">
              <thead className="table__head bg-gray-200">
                <tr className="table__row">
                  <th className="table__header py-4">Preference No</th>
                  <th className="table__header py-4">Roll No</th>
                  <th className="table__header py-4">Candidate Name</th>
                  <th className="table__header py-4">Resume Link</th>
                  <th className="table__header py-4">Status</th>
                  <th className="table__header py-4">Actions</th>
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
                        href={
                          student.resume.startsWith("http")
                            ? student.resume
                            : `http://${student.resume}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-800 underline hover:underline md:no-underline"
                      >
                        View Resume
                      </a>
                    </td>
                    <td
                      className="table__data px-4 py-2 md:px-6 md:py-4"
                      data-aos="fade-left"
                      data-title="Status"
                    >
                      {student.status || "Pending"}
                    </td>
                    <td
                      className="table__data px-4 py-2 md:px-6 md:py-4"
                      data-aos="fade-left"
                      data-title="Actions"
                    >
                      <button
                        onClick={() => handleAccept(student.rollNumber)}
                        className="bg-blue-600 gap-1 relative h-8 w-24 md:h-10 md:w-32 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-32 before:hover:w-32 hover:before:opacity-80 m-2"
                      >
                        {accepted.includes(student.rollNumber) ? (
                          <span className="relative z-100">Accepted</span>
                        ) : (
                          <span className="relative z-100">Accept</span>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(student.rollNumber)}
                        className="bg-red-600 relative h-8 w-24 md:h-10 md:w-32 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-32 before:hover:w-32 hover:before:opacity-80 m-2"
                      >
                        {rejected.includes(student.rollNumber) ? (
                          <span className="relative z-100">Rejected</span>
                        ) : (
                          <span className="relative z-100">Reject</span>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center pb-10">
          <button
            onClick={handleClick}
            disabled={confirmButtonDisabled}
            className="bg-orange-600 relative h-10 w-44 md:h-12 sm:w-44 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 before:hover:w-44 hover:before:opacity-80"
          >
            <span className="relative z-100 font-bold font-outfit tracking-wider">
              Confirm Selections
            </span>
          </button>
        </div>
      </div>
      <ConfirmModal
        show={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default CompanyTable;
