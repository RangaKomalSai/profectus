import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal.tsx";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Props {
  preferences: { [key: string]: number } | null | undefined;
}

const Table: React.FC<Props> = ({ preferences = {} }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resume, setResume] = useState("");

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);

    try {
      const safePreferences = preferences || {};

      // Convert preferences object to array
      const preferencesArray = Object.entries(safePreferences).map(
        ([company, preferenceNumber]) => ({
          company,
          preferenceNumber,
        })
      );

      const response = await axios.post(
        "http://localhost:5000/api/preferences/save-preferences",
        {
          preferences: preferencesArray,
          resume,
        },
        { withCredentials: true }
      );

      if (response.data.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResume(e.target.value);
  };

  return (
    <div className="container mx-auto flex flex-col items-center rounded-2xl">
      <table className="table bg-white border-collapse rounded-2xl shadow-md w-9/12 my-8 overflow-hidden">
        <thead className="table__head bg-gray-200">
          <tr className="table__row">
            <th className="Preference py-4 text-center">Preference No</th>
            <th className="Company py-4 text-center">Company Name</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {preferences &&
            Object.entries(preferences).map(([company, preferenceNumber]) => (
              <tr className="table__row hover:bg-gray-100" key={company}>
                <td
                  className="table__body__text table__body__text--name px-6 py-4 text-center"
                  data-aos="fade-right"
                  data-title="Preference no"
                >
                  {preferenceNumber}
                </td>
                <td
                  className="table__body__text table__body__text--country px-16 py-4 text-center"
                  data-aos="fade-left"
                  data-title="Company name"
                >
                  {company}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="w-9/12 flex justify-between items-center md:flex-row md:justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Drive Link of your Resume"
          value={resume}
          onChange={handleInputChange}
          className="h-10 w-full md:h-12 border rounded-lg px-4 shadow-md md:mb-0"
        />
        <Link onClick={handleClick} to="#">
          <button className="bg-orange-600 relative w-16 h-10 md:w-32 md:h-12 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 before:hover:w-40 hover:before:opacity-80">
            <span className="relative z-100">Apply</span>
          </button>
        </Link>
      </div>

      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Table;
